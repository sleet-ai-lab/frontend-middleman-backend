import type { BunPlugin } from "bun";
import { compile } from "svelte/compiler";
// ========================================
// SVELTE_PLUGIN
// Compiles the svelte components into plain javascript with the svelte
// compiler, so that bun can bundle the result without a svelte specific
// loader.
export function svelte_plugin(): BunPlugin {
  return {
    name: "svelte",
    setup(build) {
      build.onLoad({ filter: /\.svelte$/ }, async (args) => {
        const source = await Bun.file(args.path).text();

        const compiled = compile(source, {
          filename: args.path,
          generate: "client",
          css: "injected",
        });

        const contents = compiled.js.code.replace(
          /\/\/# sourceMappingURL=.*$/m,
          "",
        );

        return { contents, loader: "js" };
      });
    },
  };
}
// ========================================
