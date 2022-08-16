
const TokenKey = 'vue_admin_template_token'
const UserKey = 'vue_admin_template_user'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
// 持久化存信息
export function setUserInfo(info) {
  return localStorage.setItem(UserKey, info)
}
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserKey))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserKey)
}

