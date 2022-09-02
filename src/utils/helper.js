import { isNumber } from 'lodash'
import moment from 'moment'

export function isEmpty(val) {
  switch (typeof val) {
    case 'string':
      return val === ''
    case 'number':
      return parseInt(val) === 0
    case 'boolean':
      return val === false
    case 'object':
      return Array.isArray(val)
        ? val.length === 0
        : Object.prototype.toString.call(val).toLowerCase() ===
          '[object object]'
          ? Object.keys(val).length === 0
          : true
    case 'undefined':
    default:
      return true
  }
}

export function isNumeric(val) {
  var whitespace = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\x0b',
    '\xa0',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200a',
    '\u200b',
    '\u2028',
    '\u2029',
    '\u3000',
  ].join('')

  // @todo: Break this up using many single conditions with early returns
  return (
    (typeof val === 'number' ||
      (typeof val === 'string' && whitespace.indexOf(val.slice(-1)) === -1)) &&
    val !== '' &&
    !isNaN(val)
  )
}

export const ctype = {
  alnum(value) {
    return /^[A-Za-z0-9]+$/.test(String(value))
  },
  alpha(value) {
    return /[A-Za-z]+/.test(String(value))
  },
  digit(value) {
    return /^\d+$/.test(String(value))
  },
  mobile(value) {
    return /^1[3456789]\d{9}$/.test(String(value))
  },
  lower(value) {
    return /^[a-z]+$/.test(String(value))
  },
  upper(value) {
    return /^[A-Z]+$/.test(String(value))
  },
  money(value) {
    return /^\d{1,9}(.\d{1,2})?$/.test(String(value))
  },
}

export function ary2tree(data, cname = 'children', k = 'id', pk = 'pid') {
  const ary = JSON.parse(JSON.stringify(data))
  const tmp = {}
  ary.forEach((item) => {
    delete item[cname]

    tmp[item[k]] = item
  })
  const tree = []
  ary.forEach((item) => {
    const tmpv = tmp[item[pk]]
    if (tmpv) {
      if (!tmpv[cname]) {
        tmpv[cname] = []
      }
      tmpv[cname].push(item)
    } else {
      tree.push(item)
    }
  })

  return tree
}

// localStorage
export function setLocalStorage(key, value) {
  return localStorage.setItem(key, value)
}
export function getLocalStorage(key) {
  return localStorage.getItem(key)
}
export function removeLocalStorage(key) {
  return localStorage.removeItem(key)
}
// 千分位
export const filterNum = (val) => {
  // return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return isNumber(val) ? val.toLocaleString() : val
}
// 百分比
/**
 * @param {number} val 传入的值 例如 10
 * @param {number} toFixed 保留几位小数
 * @param {boolean} isDecimal 是否需要 * 100
 * @returns '10%'
 */
export const toPercent = (val, toFixed = 2, isDecimal = true) => {
  if (isNumber(val)) {
    if (val === 0) return '0%'
    return isDecimal
      ? `${Number((val * 100).toFixed(toFixed))}%`
      : `${Number(val.toFixed(toFixed))}%`
  } else {
    return val
  }
}

// 默认时间段 today 从今天算
export const defaultDatePicker = (day = 30, type = 'today') => {
  const end = new Date()
  const start = new Date()
  if (day <= 0) {
    return [
      moment(start).format('YYYY-MM-DD'),
      moment(end).format('YYYY-MM-DD'),
    ]
  } else {
    if (type === 'today') {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * (day - 1))
    } else {
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
    }
    return [
      moment(start).format('YYYY-MM-DD'),
      moment(end).format('YYYY-MM-DD'),
    ]
  }
}

// 处理参数空值
export const excludeEmpty = (obj = {}) => {
  const params = {}
  for (const key in obj) {
    const value = obj[key]
    if (value !== '' && value !== null && value !== undefined && JSON.stringify(value) !== '[]' && JSON.stringify(value) !== '{}') {
      params[key] = value
    }
  }

  return params
}
