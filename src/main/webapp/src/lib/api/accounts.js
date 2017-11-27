import { post } from "./helper";

export function createAccount(params) {
  return post("/accounts", params);
}

export function login(params) {
  return post("/accounts/login", params);
}