# self-mounting-angular-axum-backend

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

the frontend is compiled with the angular AOT compiler (`@angular/compiler-cli`)
into `.aot`, the angular packages are linked (`@angular/compiler-cli/linker`)
and then everything is bundled by bun into `static`.

rust/backend

```sh
cargo fmt
cargo check
cargo run
# cargo build
cargo build --release
./target/release/self-mounting-angular-axum-backend
```

=================
copyright 2026
