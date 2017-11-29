import { get, post } from "./helper";

export function getAllRinks() {
  return get("/rinks");
}

export function getRinkById(id) {
  return get("/rinks/" + id);
}

export function startMaintenance(id) {
  return post("/rinks/" + id + "/maintenance/actions/start");
}

export function endMaintenance(id) {
  return post("/rinks/" + id + "/maintenance/actions/stop");
}