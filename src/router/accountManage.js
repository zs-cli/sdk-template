const AccountList = () => import(/* webpackChunkName: "group-accountManage" */ '@/views/AccountManage/AccountList/index')

const pages = [
  {
    path: '/accountList',
    name: 'accountList',
    component: AccountList,
    meta: { title: '账号列表', menuTag: 'accountList', permission: 'PERMISSION:ACCOUNTMANAGE:ACCOUNTLIST', isMenu: true, crumbs: ['账号管理', '账号列表'] },
  }
]

export default {
  name: 'accountManage',
  path: '/accountManage',
  redirect: '/accountList',
  meta: { title: '账号管理', icon: 'icon-zhanghaoguanli', menuTag: 'accountManage' },
  children: pages
}
