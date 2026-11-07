import { render } from "preact";
import { APP_MOUNT_ID } from "../../ts/shared/mount_ids";
// ========================================
// APP_COMPONENT_ROUND_ICON_FUN
function APP_COMPONENT_ROUND_ICON_FUN() {
  return (
    <svg
      id="ROUND_ICON"
      viewBox="0 0 1080 1080"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="540" cy="540" r="300" fill="#f29559" />
    </svg>
  );
}
// ========================================
// APP_COMPONENT_ROUND_ICON_MOUNT
const SELF_MOUNT_ID = APP_MOUNT_ID.APP_COMPONENT_ROUND_ICON;
if (typeof document !== "undefined") {
  const el = document.getElementById(SELF_MOUNT_ID);
  if (el !== null) render(<APP_COMPONENT_ROUND_ICON_FUN />, el);
}
// ========================================
