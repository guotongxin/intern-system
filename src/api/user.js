import request from '@/utils/request.js'
// 登录
export function loginAPI(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
// export function getLoginUserInfoAPI({ username }) {
//   return request({
//     url: '/profile',
//     method: 'post',
//     data: {
//       username
//     }
//   })
// }
// 获取用户信息
export function getUserInfoAPI({ pageSize, currentPage }) {
  return request({
    url: '/userInfo',
    method: 'get',
    params: {
      pageSize,
      currentPage
    }
  })
}
// 新增用户
export function addUserAPI({ username, password, role }) {
  return request({
    url: '/addUser',
    method: 'post',
    data: {
      username,
      password,
      role

    }
  })
}

// 获取当前登录用户信息getLoginUserInfoAPI
export function getLoginUserInfoAPI() {
  return request({
    url: '/loginInfo',
    method: 'post'
  })
}

