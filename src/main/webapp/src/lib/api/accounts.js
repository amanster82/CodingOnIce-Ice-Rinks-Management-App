import { post } from "./helper";

export function createAccount(params) {
  return post("/accounts", params);
}
