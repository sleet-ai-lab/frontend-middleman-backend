# self-mounting-preact-axum-backend

bun/frontend

```sh
bun i
bunx prettier . --write
bun tsc --noEmit
# bun build
rm -rf static
cd frontend
bun build ./**/*.html --outdir=../static --minify
# or bun run build
bun run build
```

rust/backend

the default port is `64076`, override it with the `APP_PORT` env var.

```sh
cargo fmt
cargo check
cargo run
# use a different port
APP_PORT=8080 cargo run
# cargo build
cargo build --release
./target/release/self-mounting-preact-axum-backend
```

=================
copyright 2026
