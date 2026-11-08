import { mount, type Component } from "svelte";
// ========================================
// APP_MOUNT_ID
export const APP_MOUNT_ID = {
  APP_COMPONENT_ROUND_ICON: "APP_COMPONENT_ROUND_ICON",
  APP_COMPONENT_HELLO_WORLD: "APP_COMPONENT_HELLO_WORLD",
} as const;

// ========================================
// APP_MOUNT_ID_TYPE
export type APP_MOUNT_ID_TYPE =
  (typeof APP_MOUNT_ID)[keyof typeof APP_MOUNT_ID];

// ========================================
// APP_MOUNT_COMPONENT_FUN
// mounts a svelte component into its own mount id, there is no root component
// that mounts the children, every component mounts itself.
export function app_mount_component_fun(
  mount_id: APP_MOUNT_ID_TYPE,
  component: Component,
): void {
  if (typeof document === "undefined") return;

  const el = document.getElementById(mount_id);
  if (el === null) return;

  mount(component, { target: el });
}
// ========================================
