import { rm } from "node:fs/promises";
import { join } from "node:path";
import tailwind from "bun-plugin-tailwind";
import { svelte_plugin } from "./svelte_plugin";
// ========================================
// BUILD_FUN
const repositoryRoot = import.meta.dir;
const frontendDirectory = join(repositoryRoot, "frontend");
const outputDirectory = join(repositoryRoot, "static");

process.chdir(frontendDirectory);

await rm(outputDirectory, { recursive: true, force: true });

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
  plugins: [tailwind, svelte_plugin()],
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log(`Built ${result.outputs.length} files into ${outputDirectory}`);
// ========================================
