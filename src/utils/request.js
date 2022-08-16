import axios from 'axios'
import store from '@/store'
// import { getToken } from '@/utils/auth'

//
const service = axios.create({
  baseURL: 'http://localhost:9001/api',
  timeout: 10000
})
//
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('error', error)
    // if (error.response.status === 401) {
    //   console.log('过期token')
    //   this.$message.error('您的token已失效，请重新登录')
    //   store.dispatch('user/logout')
    // }
    return Promise.reject(error)
  }
)

export default service
