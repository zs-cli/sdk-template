const Mock = require('mockjs')

module.exports = [
  {
    url: '/mock-template/getMenuPermList',
    type: 'post',
    response: config => {
      return Mock.mock({
        'code': 200,
        'data': {
          'permission': ['PERMISSION:ACCOUNTMANAGE:ACCOUNTLIST', 'PERMISSION:ACCOUNTMANAGE:ACCOUNTLIST:SHOW', 'PERMISSION:ACCOUNTMANAGE:ACCOUNTLIST:ADD', 'PERMISSION:ACCOUNTMANAGE:ACCOUNTLIST:EDIT'],
          'menu': [{ 'name': 'accountManage', 'title': '账号管理', 'path': '\/accountManage', 'icon': 'icon-zhanghaoguanli', 'children': [{ 'name': 'accountList', 'title': '账号列表', 'path': '\/accountList', 'icon': null, 'children': [] }] }] },
        'msg': '操作成功'
      })
    }
  }
]
