import cache from './cache'
// import cookie from 'js-cookie'

const TokenKey = '996sdk_accesstoken'

export function getToken() {
  return cache.get(TokenKey, '')
}

export function setToken(token) {
  return cache.set(TokenKey, token)
}

export function removeToken() {
  // cookie.remove('token')
  // cookie.remove('issub')
  return cache.remove(TokenKey)
}

export function setCookieToken(token) {
  // token存cookie一份
  // cookie.set('token', token)
  // cookie.set('issub', 0)
}
