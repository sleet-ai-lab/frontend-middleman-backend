import "./hello.ts";
import "./ping.ts";
import { APP_MOUNT_ID, app_mount_component_fun } from "./shared/mount_ids.ts";
import APP_COMPONENT_HELLO_WORLD from "../components/app/hello_world.svelte";
// ========================================
// APP_COMPONENT_HELLO_WORLD_MOUNT
app_mount_component_fun(
  APP_MOUNT_ID.APP_COMPONENT_HELLO_WORLD,
  APP_COMPONENT_HELLO_WORLD,
);
// ========================================
