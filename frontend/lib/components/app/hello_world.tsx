import { render } from "preact";
import { APP_MOUNT_ID } from "../../ts/shared/mount_ids";

function APP_COMPONENT_HELLO_WORLD_FUN() {
  return <p>hello world</p>;
}

const SELF_MOUNT_ID = APP_MOUNT_ID.APP_COMPONENT_HELLO_WORLD;
if (typeof document !== "undefined") {
  const el = document.getElementById(SELF_MOUNT_ID);
  if (el !== null) render(<APP_COMPONENT_HELLO_WORLD_FUN />, el);
}
