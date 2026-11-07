use axum::{Json, response::IntoResponse};
// ========================================
pub async fn ping_route() -> impl IntoResponse {
    Json(serde_json::json!({
        "ok": true,
        "app": "self-mounting-angular-axum-backend",
    }))
}
// ========================================
