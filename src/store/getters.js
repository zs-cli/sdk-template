export default {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  // menu
  menuList: state => state.menu.menuList,
  permission: state => state.menu.permission,
}
