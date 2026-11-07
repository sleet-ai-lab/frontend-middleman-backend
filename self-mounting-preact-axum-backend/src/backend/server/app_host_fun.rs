// ========================================
pub fn app_host_fun() -> String {
    std::env::var("APP_HOST")
        .ok()
        .filter(|v| !v.is_empty())
        .unwrap_or_else(|| "0.0.0.0".to_string())
}
// ========================================
