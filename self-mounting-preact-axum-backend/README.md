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
