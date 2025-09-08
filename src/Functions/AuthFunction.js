import Cookies from "js-cookie";

const COOKIE_KEY = "auth_accounts";

export const saveAccountToCookie = (role, token) => {
  const existing = Cookies.get(COOKIE_KEY)
  let accounts = existing ? JSON.parse(existing) : {}

  accounts[role] = { role, token }
  Cookies.set(COOKIE_KEY, JSON.stringify(accounts), { expires: 1 })
}


export const getAccountByRole = (role) => {
  const existing = Cookies.get(COOKIE_KEY)
  if (!existing) return null
  const accounts = JSON.parse(existing)
  return accounts[role] || null
};


export const removeAccountByRole = (role) => {
  const existing = Cookies.get(COOKIE_KEY)
  if (!existing) return
  let accounts = JSON.parse(existing)
  delete accounts[role]

  Cookies.set(COOKIE_KEY, JSON.stringify(accounts), { expires: 7 })
}


export const getAllAccounts = () => {
  const existing = Cookies.get(COOKIE_KEY);
  return existing ? JSON.parse(existing) : {};
};


export const getAccountFromRoute = (pathname) => {
  const accounts = Cookies.get(COOKIE_KEY)
    ? JSON.parse(Cookies.get(COOKIE_KEY))
    : {}

  if (pathname.startsWith("/admin")) {
    return accounts["admin"] || null;
  } else if (pathname.startsWith("/user")) {
    return accounts["user"] || null;
  }
  return null;
};
