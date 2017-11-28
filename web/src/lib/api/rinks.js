import { get } from "./helper";

export function getAllRinks() {
  return get("/rinks");
}

export function getRinkById(id) {
  return get("/rinks/" + id);
}