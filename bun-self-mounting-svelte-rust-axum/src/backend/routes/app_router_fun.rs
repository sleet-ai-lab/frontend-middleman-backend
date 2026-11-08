use super::ping_route::ping_route;
use axum::{
    Router,
    extract::Request,
    http::{HeaderValue, Method, StatusCode},
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::get,
};
use tower_http::{cors::CorsLayer, services::ServeDir};
// ========================================
// cors_preflight_middleware_fun
async fn cors_preflight_middleware_fun(req: Request, next: Next) -> Response {
    if req.method() == Method::OPTIONS {
        return (
            StatusCode::NO_CONTENT,
            [
                ("access-control-allow-origin", "*"),
                (
                    "access-control-allow-methods",
                    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
                ),
                ("access-control-allow-headers", "*"),
                ("access-control-max-age", "86400"),
            ],
        )
            .into_response();
    }
    next.run(req).await
}
// ========================================
// fresh_static_middleware_fun
async fn fresh_static_middleware_fun(req: Request, next: Next) -> Response {
    let mut res = next.run(req).await;
    if res.status() != StatusCode::NO_CONTENT {
        res.headers_mut().insert(
            axum::http::HeaderName::from_static("cache-control"),
            axum::http::HeaderValue::from_static("no-cache, must-revalidate"),
        );
    }
    res
}
// ========================================
// app_router_fun
pub fn app_router_fun() -> Router {
    let api_router = Router::new().route("/api/app/ping", get(ping_route));
    let static_service = ServeDir::new("static");
    let static_router = Router::new()
        .fallback_service(static_service)
        .layer(middleware::from_fn(fresh_static_middleware_fun));
    let cors = CorsLayer::new()
        .allow_origin(HeaderValue::from_static("*"))
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::PATCH,
            Method::DELETE,
            Method::OPTIONS,
        ])
        .allow_headers(tower_http::cors::Any)
        .max_age(std::time::Duration::from_secs(86400));
    Router::new()
        .merge(api_router)
        .merge(static_router)
        .layer(cors)
        .layer(middleware::from_fn(cors_preflight_middleware_fun))
}
// ========================================
