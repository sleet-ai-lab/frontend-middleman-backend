import { rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { angular_aot_compile_fun } from "./angular_aot";
import { angular_linker_plugin } from "./angular_linker";
// ========================================
// BUILD_FUN
const repositoryRoot = import.meta.dir;
const frontendDirectory = join(repositoryRoot, "frontend");
const outputDirectory = join(repositoryRoot, "static");
const aotDirectory = join(repositoryRoot, ".aot");

process.chdir(frontendDirectory);

await rm(outputDirectory, { recursive: true, force: true });
await rm(aotDirectory, { recursive: true, force: true });

// angular aot compile (templates -> javascript)
await angular_aot_compile_fun({
  project: join(repositoryRoot, "tsconfig.json"),
  outdir: aotDirectory,
});

const htmlEntrypoints = Array.from(
  new Bun.Glob("**/*.html").scanSync({ cwd: frontendDirectory }),
).sort();

const result = await Bun.build({
  entrypoints: [...htmlEntrypoints],
  outdir: outputDirectory,
  root: frontendDirectory,
  minify: true,
  naming: {
    entry: "[dir]/[name].[ext]",
    chunk: "[dir]/[name]-[hash].[ext]",
    asset: "[dir]/[name].[ext]",
  },
  plugins: [
    angular_linker_plugin(),
    {
      name: "angular-aot-resolver",
      setup(build) {
        // serve the aot compiled javascript instead of the typescript sources
        build.onResolve({ filter: /\.(ts|tsx)$/ }, (args) => {
          if (!args.path.startsWith(".") && !args.path.startsWith("/")) {
            return; // bare specifier, leave it to bun
          }
          const importer_dir = args.importer
            ? dirname(args.importer)
            : frontendDirectory;
          const absolute = resolve(importer_dir, args.path);
          if (!absolute.startsWith(frontendDirectory)) return;
          const relative = absolute.slice(frontendDirectory.length + 1);
          return {
            path: join(aotDirectory, relative).replace(/\.tsx?$/, ".js"),
          };
        });
      },
    },
  ],
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log(`Built ${result.outputs.length} files into ${outputDirectory}`);
// ========================================
