// import { getToken, setToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '@/utils/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getLoginUserInfoAPI } from '@/api/user'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    // userInfo: getUserInfo()
    userInfo: {}
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置token
  SET_TOKEN: (state, newToken) => {
    state.token = newToken
    setToken(newToken)
  },
  // 删除token
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  // 设置用户登录信息（账号名角色）
  SET_USERINFO: (state, info) => {
    state.userInfo = info
    // setUserInfo(JSON.stringify(info))
  },
  REMOVE_USERINFO: (state) => {
    state.userInfo = {}
    // removeUserInfo()
  }
}

const actions = {
  logout(ctx) {
    console.log('退出登录')
    ctx.commit('REMOVE_TOKEN')
    ctx.commit('REMOVE_USERINFO')
    router.replace(`/login?redirect=${router.currentRoute.fullPath}`)
  },
  async getLoginUserInfoAction(ctx) {
    console.log('ctx', ctx)
    console.log('action执行')
    const res = await getLoginUserInfoAPI()
    console.log('用户信息', res)
    if (res.data.userInfo) { ctx.commit('SET_USERINFO', res.data?.userInfo[0]) }
    return res.data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
