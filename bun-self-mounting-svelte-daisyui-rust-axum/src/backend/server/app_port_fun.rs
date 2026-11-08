// ========================================
pub fn app_port_fun() -> u16 {
    std::env::var("APP_PORT")
        .ok()
        .and_then(|v| v.parse::<u16>().ok())
        .unwrap_or(64079)
}
// ========================================
