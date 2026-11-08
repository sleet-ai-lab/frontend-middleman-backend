# bun-self-mounting-svelte-daisyui-rust-axum

bun/frontend

```sh
bun i
bunx prettier . --write
bun tsc --noEmit
# bun build (builds the middleman first, then the frontend)
bun run build
# check the rendered output in a headless dom
bun run render:check
```

the frontend is compiled with the svelte 5 compiler (`svelte/compiler`) through a
bun plugin (`svelte_plugin.ts`) and then everything is bundled by bun into
`static`.

this demo is the same as `bun-self-mounting-svelte-rust-axum`, but it adds
daisyui on top of tailwind css v4 to show that daisyui can be used with bun.

## tailwind css v4 + daisyui

tailwind css v4 is not understood by the css bundler that is built into bun, the
`@plugin` and the `@theme` at-rules are simply ignored by it, so the
`bun-plugin-tailwind` plugin is used instead. it runs the real tailwind css v4
compiler, so the output is the same as the tailwind cli would produce.

```ts
// build.ts
import tailwind from "bun-plugin-tailwind";

plugins: [tailwind, svelte_plugin()],
```

the css itself lives in `frontend/lib/css/app.css`:

```css
@import "tailwindcss" source(none);
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
}
@source "../../**/*.{svelte,ts,html}";
@source "../../../index.html";
@source "../../../app/index.html";
```

the `source(none)` on the tailwindcss import is required, without it the default
scanner also matches the daisyui sources that live inside `node_modules`, which
pulls in every daisyui component (the css grows from around 35 kB to around
146 kB). the `@source` directives list the frontend sources explicitly instead,
the paths are relative to the css file.

daisyui only styles its own components, a bare `<p>` stays unstyled. the
`text-base-content` class on the hello world paragraph is a daisyui theme color
class, so it applies the theme text color without changing the layout.

## no custom css files

this demo has **no custom css files**. `frontend/lib/css/app.css` is the only
css file and it holds nothing but the tailwind/daisyui configuration, it has no
custom rules in it. the page layout and the icon size come entirely from
tailwind utility classes:

- the `<main>` element of `frontend/index.html` and `frontend/app/index.html`
  uses `min-h-screen flex flex-col justify-center items-center box-border`,
  which replaces the old `main { ... }` rule
- the `<svg>` in `frontend/lib/components/root/round_icon.svelte` uses
  `w-[200px]`, which replaces the old `svg { width: 200px }` rule

rust/backend

the default port is `64079`, override it with the `APP_PORT` env var.

```sh
cargo fmt
cargo check
cargo run
# cargo build
cargo build --release
./target/release/frontend-middleman-backend-backend-bun-svelte-daisyui
```

=================
copyright 2026
