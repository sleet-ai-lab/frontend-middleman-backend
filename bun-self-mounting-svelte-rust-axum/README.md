# bun-self-mounting-svelte-rust-axum

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

rust/backend

the default port is `64078`, override it with the `APP_PORT` env var.

```sh
cargo fmt
cargo check
cargo run
# cargo build
cargo build --release
./target/release/frontend-middleman-backend-backend-bun-svelte
```

=================
copyright 2026
