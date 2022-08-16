import request from '@/utils/request.js'
// 获取论坛
export function getMyForumtAPI({ aut_name }) {
  return request({
    url: '/for/getMyForum',
    method: 'post',
    data: {
      aut_name
    }
  })
}
// 获取全全部
export function getAllForumtAPI() {
  return request({
    url: '/for/getAllForum',
    method: 'get'
  })
}
// 发布论坛
export function putForumtAPI({ aut_name, content }) {
  return request({
    url: '/for/putForum',
    method: 'post',
    data: {
      aut_name,
      content
    }
  })
}
//
