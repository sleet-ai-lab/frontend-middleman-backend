import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { Window } from "happy-dom";
// ========================================
// RENDER_CHECK_FUN
const repository_root = join(import.meta.dir, "..");
const static_directory = join(repository_root, "static");
const static_app_directory = join(static_directory, "app");

const app_files = await readdir(static_app_directory);
const app_bundle_name = app_files.find(
  (f) => f.startsWith("index-") && f.endsWith(".js"),
);
if (!app_bundle_name) throw new Error("no app bundle found in static/app");

const root_files = await readdir(static_directory);
const root_bundle_name = root_files.find(
  (f) => f.startsWith("index-") && f.endsWith(".js"),
);
if (!root_bundle_name) throw new Error("no root bundle found in static");

// ========================================
// RENDER_CHECK_APP_FUN
async function render_check_app_fun(): Promise<boolean> {
  const window = new Window({ url: "http://localhost:64076/app/index.html" });
  const document = window.document;

  const global_any = globalThis as any;
  global_any.window = window;
  global_any.document = document;
  global_any.navigator = window.navigator;
  global_any.location = window.location;
  global_any.requestAnimationFrame = window.requestAnimationFrame.bind(window);
  global_any.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
  global_any.getComputedStyle = window.getComputedStyle.bind(window);
  global_any.HTMLElement = window.HTMLElement;
  global_any.Element = window.Element;
  global_any.Node = window.Node;
  global_any.Event = window.Event;
  global_any.CustomEvent = window.CustomEvent;
  global_any.MutationObserver = window.MutationObserver;
  global_any.DOMParser = window.DOMParser;
  global_any.XMLHttpRequest = window.XMLHttpRequest;
  global_any.fetch = fetch;

  document.body.innerHTML = `<main><div id="APP_COMPONENT_HELLO_WORLD"></div></main>`;

  await import(join(static_app_directory, app_bundle_name));
  await new Promise((r) => setTimeout(r, 500));

  const el = document.getElementById("APP_COMPONENT_HELLO_WORLD");
  console.log("APP MOUNTED HTML:", el?.innerHTML);
  return (el?.innerHTML?.includes("hello world") ?? false) === true;
}

// ========================================
// RENDER_CHECK_ROOT_FUN
async function render_check_root_fun(): Promise<boolean> {
  const window = new Window({ url: "http://localhost:64076/" });
  const document = window.document;

  const global_any = globalThis as any;
  global_any.window = window;
  global_any.document = document;
  global_any.navigator = window.navigator;
  global_any.location = window.location;
  global_any.requestAnimationFrame = window.requestAnimationFrame.bind(window);
  global_any.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
  global_any.getComputedStyle = window.getComputedStyle.bind(window);
  global_any.HTMLElement = window.HTMLElement;
  global_any.Element = window.Element;
  global_any.Node = window.Node;
  global_any.Event = window.Event;
  global_any.CustomEvent = window.CustomEvent;
  global_any.MutationObserver = window.MutationObserver;
  global_any.DOMParser = window.DOMParser;
  global_any.XMLHttpRequest = window.XMLHttpRequest;
  global_any.fetch = fetch;

  document.body.innerHTML = `<main><div id="APP_COMPONENT_ROUND_ICON"></div></main>`;

  await import(join(static_directory, root_bundle_name));
  await new Promise((r) => setTimeout(r, 500));

  const el = document.getElementById("APP_COMPONENT_ROUND_ICON");
  console.log("ROOT MOUNTED HTML:", el?.innerHTML);
  return (el?.innerHTML?.includes("ROUND_ICON") ?? false) === true;
}

const app_ok = await render_check_app_fun();
const root_ok = await render_check_root_fun();

console.log("APP RESULT:", app_ok ? "PASS" : "FAIL");
console.log("ROOT RESULT:", root_ok ? "PASS" : "FAIL");

if (!app_ok || !root_ok) process.exit(1);
// ========================================
