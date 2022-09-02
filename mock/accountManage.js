const Mock = require('mockjs')
const mock = Mock.mock

module.exports = [
  {
    url: '/mock-template/list',
    type: 'get',
    response: config => {
      return mock({
        'code': 200,
        'data|5-100': [
          { 'id': '@id', 'username': '@name', 'nickname': '@cname', 'phone': '1555555555', 'status': 1, 'login_err_num': 0, 'last_login': '2022-09-02 14:13:08', 'last_login_ip': '47.114.215.70', 'create_at': '@time' }
        ],
        'msg': '操作成功'
      })
    }
  }
]
