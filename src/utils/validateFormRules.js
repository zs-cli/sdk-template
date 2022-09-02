// element ui form rules
// 验证账号
export const vUsername = async(rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入登录账号'))
  } else if (value.length < 5) {
    callback(new Error('用户名最少5位'))
  } else if (value.length > 20) {
    callback(new Error('用户名最多20位'))
  } else {
    callback()
  }
}
// 验证手机号
export function vPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入手机号'))
  } else if (value && !/^1[0-9]{10}$/.test(value)) {
    return callback(new Error('手机号码填写有误，请重新输入！'))
  } else {
    return callback()
  }
}
// 注册验证密码
export function vPassword(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入登录密码'))
  } else if (value.length < 6) {
    callback(new Error('密码最少6位'))
  } else if (value.length > 20) {
    callback(new Error('密码最多20位'))
  } else {
    callback()
  }
}
// 登录密码
export function vPassword2(rule, value, callback) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])[^]{6,20}$/
  const reg2 = /^\w+$/
  if (!reg.test(value)) {
    callback(new Error('密码至少包含大小写字母各一个'))
  } else if (!reg2.test(value)) {
    callback(new Error('密码不能包含特殊字符'))
  } else {
    callback()
  }
}
