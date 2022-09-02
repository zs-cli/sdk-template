export function mtRand(min, max) {
  if (arguments.length === 0) {
    min = 0
    max = 2147483647
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomString(length, incsc) {
  let charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (incsc) {
    charset += '~!@#$%^&*()_+'
  }
  return Array(length).join().split(',').map(item => charset.charAt(Math.floor(Math.random() * charset.length))).join('')
}
