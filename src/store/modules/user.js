import { login, phoneLogin, logout, getInfo } from '@/api/common'
import { getToken, setToken, removeToken, setCookieToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, value) => {
    state.token = value
  },
  SET_USERINFO: (state, value) => {
    state.userInfo = value
  },
}

const actions = {
  login({ commit }, formData) {
    return login(formData).then(res => {
      const { data: { token }} = res
      if (token) {
        commit('SET_TOKEN', token)
        setToken(token)
        setCookieToken(token)
      }
    })
  },
  async phoneLogin({ commit }, formData) {
    try {
      const res = await phoneLogin(formData)
      const { data: { token }} = res
      if (token) {
        commit('SET_TOKEN', token)
        setToken(token)
        setCookieToken(token)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getInfo({ commit }) {
    const res = await getInfo()
    const { data } = res
    commit('SET_USERINFO', data)
    setCookieToken(getToken())
  },
  logout({ commit }) {
    return logout().then(() => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
