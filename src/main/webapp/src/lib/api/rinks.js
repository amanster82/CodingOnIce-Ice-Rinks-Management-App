import { get } from "./helper";

export function getAllRinks() {
  return get("/rinks");
}
