# self-mounting-preact-axum-backend

bun/frontend

```sh
bun i
bunx prettier . --write
bun tsc --noEmit
# bun build (builds the middleman first, then the frontend)
bun run build
```

rust/backend

the default port is `64076`, override it with the `APP_PORT` env var.

```sh
cargo fmt
cargo check
cargo run
# cargo build
cargo build --release
./target/release/self-mounting-preact-axum-backend
```

=================
copyright 2026
