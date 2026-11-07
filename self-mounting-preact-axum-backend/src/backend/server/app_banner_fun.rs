pub fn app_banner_fun(host: &str, port: u16) {
    println!("====================================");
    if host == "0.0.0.0" || host == "::" {
        println!("bound to {host}:{port}");
    } else {
        println!("listening on {host}:{port}");
    }
    println!();
    println!("open:");
    println!("  http://localhost:{port}/");
    println!("  http://localhost:{port}/app/index.html");
    println!();
    println!("api:");
    println!("  http://localhost:{port}/api/app/ping");
    println!("====================================");
}
