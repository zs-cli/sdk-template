import axios from 'axios'
// import qs from 'qs'
import { MD5 } from 'crypto-js'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { randomString } from './random'
import date from './date'
import buildURL from 'axios/lib/helpers/buildURL'

// 取消接口时 排除公共接口
const COMMON_INTERFACE = []

const service = axios.create({
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})
const sign = function(conf) {
  if (conf.url.toLowerCase().indexOf('upload') === -1) {
    Object.assign(conf.headers, {
      'x-996sdk-appid': process.env.VUE_APP_APPID,
      'x-996sdk-nonce': randomString(16),
      'x-996sdk-timestamp': '' + date.now(),
      'x-996sdk-algo': 'MD5',
    })
    delete conf.headers['x-996sdk-sign']

    conf.url = buildURL(conf.url, conf.params, conf.paramsSerializer)
    delete conf.params

    const args = [
      conf.method.toUpperCase(),
      conf.url.replace(process.env.VUE_APP_BASE_API, ''),
    ]

    const headers = {}
    Object.keys(conf.headers).filter(k => {
      return k.toLowerCase().indexOf('x-996sdk-') > -1
    }).sort().forEach(k => {
      headers[k] = conf.headers[k]
      args.push(k + '=' + headers[k])
      delete conf.headers[k]
    })
    if (conf.data) {
      args.push(JSON.stringify(conf.data))
    } else {
      args.push('')
    }
    args.push('key=' + process.env.VUE_APP_APPKEY)
    // console.info(args)
    headers['x-996sdk-sign'] = MD5(args.join('\n'))

    Object.assign(conf.headers, headers)
  }
}

window._axiosPromiseArr = []

service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = config.headers['Juhe-Token'] = getToken()
    sign(config)
    // 增加取消操作
    // 排除appid改变 - 菜单接口 nav/tree
    COMMON_INTERFACE.forEach(inter => {
      if (!config.url.includes(inter)) {
        config.cancelToken = new axios.CancelToken(cancel => {
          window._axiosPromiseArr.push({ cancel })
        })
      }
    })

    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    // console.info(response)
    const res = response.data

    if (res.code !== 200) {
      if (res.code === 400) {
        setTimeout(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }, 300)
      }
      Message({
        message: res.msg || res.message || '网络错误',
        type: 'error',
      })
      return Promise.reject(res)
    }

    return res
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        setTimeout(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }, 300)
      }
      Message({
        message: error.msg || error.message,
        type: 'error',
      })
    }

    return Promise.reject(error)
  },
)

export default service
