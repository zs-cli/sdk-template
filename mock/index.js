const Mock = require('mockjs')
const common = require('./common')
const menu = require('./menu')
const accountManage = require('./accountManage')

const mocks = [
  ...common,
  ...menu,
  ...accountManage,
]

function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}

module.exports = {
  mocks,
  mockXHR,
}
