use self_mounting_angular_axum_backend::backend::routes::app_router_fun::app_router_fun;
use self_mounting_angular_axum_backend::backend::server::{
    app_banner_fun::app_banner_fun, app_host_fun::app_host_fun, app_port_fun::app_port_fun,
};
// ========================================
#[tokio::main]
async fn main() {
    let host = app_host_fun();
    let port = app_port_fun();
    let addr = format!("{host}:{port}");

    let listener = match tokio::net::TcpListener::bind(&addr).await {
        Ok(l) => l,
        Err(e) => {
            eprintln!("failed to bind {addr}: {e}");
            std::process::exit(1);
        }
    };

    app_banner_fun(&host, port);

    if let Err(e) = axum::serve(listener, app_router_fun()).await {
        eprintln!("server error: {e}");
        std::process::exit(1);
    }
}
// ========================================
