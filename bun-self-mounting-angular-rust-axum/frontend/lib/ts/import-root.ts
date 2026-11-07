import "./hello.ts";
import "./root/root_page_start.ts";
import { APP_MOUNT_ID, app_mount_component_fun } from "./shared/mount_ids.ts";
import { APP_COMPONENT_ROUND_ICON } from "../components/root/round_icon.ts";
// ========================================
// APP_COMPONENT_ROUND_ICON_MOUNT
app_mount_component_fun(
  APP_MOUNT_ID.APP_COMPONENT_ROUND_ICON,
  APP_COMPONENT_ROUND_ICON,
);
// ========================================
