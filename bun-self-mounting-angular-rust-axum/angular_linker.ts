import type { BunPlugin } from "bun";
import { transformAsync } from "@babel/core";
import { needsLinking } from "@angular/compiler-cli/linker";
// ========================================
// ANGULAR_LINKER_PLUGIN
// The angular npm packages are shipped as "partially compiled" code, they need
// to be processed by the angular linker to become fully AOT compiled. Without
// this step angular falls back to the JIT compiler at runtime, which is not
// available in the browser bundle.
export function angular_linker_plugin(): BunPlugin {
  return {
    name: "angular-linker",
    setup(build) {
      build.onLoad({ filter: /\.mjs$/ }, async (args) => {
        const source = await Bun.file(args.path).text();
        if (!needsLinking(args.path, source)) return undefined;

        const linker_plugin = (
          await import("@angular/compiler-cli/linker/babel")
        ).default as never;

        const result = await transformAsync(source, {
          filename: args.path,
          configFile: false,
          babelrc: false,
          compact: false,
          sourceType: "module",
          parserOpts: { sourceType: "module" },
          plugins: [linker_plugin as never],
        });

        if (result?.code === null || result?.code === undefined)
          return undefined;

        return { contents: result.code, loader: "js" };
      });
    },
  };
}
// ========================================
