import { getMenuPermList } from '@/api/menu'

const state = {
  loadingStatus: false,
  menuList: [],
  permission: []
}

const mutations = {
  save(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
}

const actions = {
  async getMenuPermList({ commit }) {
    commit('save', { 'loadingStatus': true })
    try {
      const res = await getMenuPermList()
      const { data: { menu, permission }} = res
      commit('save', { 'menuList': menu })
      commit('save', { 'permission': permission })
    } catch (error) {
      commit('setMenu', [])
    }
    commit('save', { 'loadingStatus': false })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
