const Mock = require('mockjs')

module.exports = [
  // 登录
  {
    url: '/mock-template/login',
    type: 'post',
    response: config => {
      return Mock.mock({
        code: 200,
        data: {
          token: '@string(32)'
        },
        msg: '操作成功',
      })
    }
  },
  // 手机号登录
  {
    url: '/mock-template/loginPhone',
    type: 'post',
    response: config => {
      return Mock.mock({
        code: 200,
        data: {
          token: '@string(32)'
        },
        msg: '操作成功',
      })
    }
  },
  // 获取用户信息
  {
    url: '/mock-template/getInfo',
    type: 'post',
    response: config => {
      return Mock.mock({
        code: 200,
        data: {
          create_at: '2022-08-25 20:41:36',
          id: 1,
          last_login: '2022-09-02 14:13:08',
          last_login_ip: 'xxxxxxx',
          login_err_num: 0,
          nickname: '超管',
          phone: '15000000000',
          status: 1,
          username: 'admin',
        },
        msg: '操作成功',
      })
    }
  }
]
