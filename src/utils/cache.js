export default {
  set(key, val, ttl) {
    if (ttl === undefined) {
      ttl = 0
    }
    const dat = JSON.stringify({
      expireAt: ttl > 0 ? (Date.now() + ttl * 1000) : 0,
      data: val,
    })
    localStorage.setItem(key, dat)

    return true
  },

  setex(key, val, ttl) {
    const tmp = localStorage.getItem(key)
    if (!tmp) {
      return false
    }

    return this.set(key, val, ttl)
  },

  setnx(key, val, ttl) {
    const tmp = localStorage.getItem(key)
    if (tmp) {
      return false
    }

    return this.set(key, val, ttl)
  },

  get(key, def = null) {
    let sub = ''
    if (key.indexOf('.') > -1) {
      [key, sub] = key.split('.')
    }
    const tmp = localStorage.getItem(key) // {"expireAt": 0, "data": JSON_DATA}
    if (!tmp) {
      return def
    }
    try {
      const dat = JSON.parse(tmp)
      if (!Object.prototype.hasOwnProperty.call(dat, 'expireAt') || !Object.prototype.hasOwnProperty.call(dat, 'data')) {
        return def
      }
      if (dat.expireAt > 0 && dat.expireAt < Date.now()) {
        this.remove(key)

        return def
      }
      const data = dat.data
      if (sub !== '') {
        return Object.prototype.hasOwnProperty.call(data, sub) ? data[sub] : def
      }

      return data
    } catch (ex) {
      console.error('cache.get.parse', ex)
    }

    return def
  },

  remove(key) {
    if (key.indexOf('.') > -1) {
      let sub
      [key, sub] = key.split('.')
      const dat = this.get(key)
      if (!dat) {
        return this
      }
      delete dat[sub]
      this.set(key, dat)

      return this
    }
    localStorage.removeItem(key)

    return this
  },

  reset() {
    localStorage.clear()

    return this
  },
}
