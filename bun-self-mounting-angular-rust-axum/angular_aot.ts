import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  EmitFlags,
  NodeJSFileSystem,
  createCompilerHost,
  exitCodeFromResult,
  formatDiagnostics,
  performCompilation,
  readConfiguration,
  setFileSystem,
} from "@angular/compiler-cli";
// ========================================
// ANGULAR_AOT_COMPILE_FUN
// Runs the Angular AOT compiler (ngtsc) over the frontend sources and writes
// plain javascript into the given output directory, so that Bun can bundle the
// result without needing any Angular specific loader.
export async function angular_aot_compile_fun({
  project,
  outdir,
}: {
  project: string;
  outdir: string;
}): Promise<void> {
  setFileSystem(new NodeJSFileSystem());

  const parsed = readConfiguration(project, {
    compilationMode: "full",
    generateCodeForLibraries: false,
    skipTemplateCodegen: false,
  });

  const format_host = {
    getCanonicalFileName: (f: string) => f,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => "\n",
  };

  if (parsed.errors.length > 0) {
    console.error(formatDiagnostics(parsed.errors, format_host));
    throw new Error("angular aot: configuration errors");
  }

  const options = parsed.options as Record<string, unknown>;
  options.noEmit = false;
  options.declaration = false;
  options.declarationMap = false;
  options.sourceMap = false;
  options.inlineSourceMap = false;
  options.inlineSources = false;
  options.outDir = outdir;
  options.emitDeclarationOnly = false;
  options.composite = false;
  options.incremental = false;
  options.tsBuildInfoFile = undefined;
  options.allowImportingTsExtensions = true;
  options.rewriteRelativeImportExtensions = true;

  const emitted = new Map<string, string>();

  const host = createCompilerHost({ options });
  const host_write_file = host.writeFile.bind(host);
  host.writeFile = (file_name, data, ...rest) => {
    emitted.set(file_name, data);
    host_write_file(file_name, data, ...(rest as [boolean, undefined]));
  };

  const result = performCompilation({
    rootNames: parsed.rootNames,
    options,
    host,
    emitFlags: EmitFlags.JS | EmitFlags.Codegen,
  });

  const diagnostics = [...parsed.errors, ...(result.diagnostics ?? [])];
  if (diagnostics.length > 0) {
    console.error(formatDiagnostics(diagnostics, format_host));
    if (exitCodeFromResult(diagnostics) !== 0) {
      throw new Error("angular aot: compilation failed");
    }
  }

  await rm(outdir, { recursive: true, force: true });
  for (const [file_name, contents] of emitted) {
    await mkdir(dirname(file_name), { recursive: true });
    await writeFile(file_name, contents);
  }
}
// ========================================
