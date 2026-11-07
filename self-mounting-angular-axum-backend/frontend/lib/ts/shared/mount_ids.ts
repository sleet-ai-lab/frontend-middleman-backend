import { ApplicationRef, Type, createComponent } from "@angular/core";
import { createApplication } from "@angular/platform-browser";
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
// APP_BOOTSTRAP_FUN
let APP_BOOTSTRAP_PROMISE: Promise<ApplicationRef> | null = null;

// creates the angular application without bootstrapping a root component, the
// components are mounted into their own mount ids instead.
function app_bootstrap_fun(): Promise<ApplicationRef> {
  if (APP_BOOTSTRAP_PROMISE === null) {
    APP_BOOTSTRAP_PROMISE = createApplication();
  }
  return APP_BOOTSTRAP_PROMISE;
}

// ========================================
// APP_MOUNT_COMPONENT_FUN
export async function app_mount_component_fun<T>(
  mount_id: APP_MOUNT_ID_TYPE,
  component: Type<T>,
): Promise<void> {
  if (typeof document === "undefined") return;

  const el = document.getElementById(mount_id);
  if (el === null) return;

  const application_ref = await app_bootstrap_fun();

  const component_ref = createComponent(component, {
    hostElement: el,
    environmentInjector: application_ref.injector,
  });

  application_ref.attachView(component_ref.hostView);
  component_ref.changeDetectorRef.detectChanges();
}
// ========================================
