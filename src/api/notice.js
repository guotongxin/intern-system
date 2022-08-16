import request from '@/utils/request.js'
// 获取公告
export function getNoticeListAPI() {
  return request({
    url: '/getNotice'
    // method: 'post'
  })
}
// 新增公告
export function addNoticeListAPI({ date, name, title, content }) {
  return request({
    url: '/addNotice',
    method: 'post',
    data: {
      date,
      name,
      title,
      content
    }
  })
}
// 删除公告
export function delNoticeAPI({ date, name, title, content }) {
  return request({
    url: '/delNotice',
    method: 'DELETE',
    data: {
      date,
      name,
      title,
      content
    }
  })
}
// 确认公告
export function confirmNoticeAPI({ nid }) {
  return request({
    url: '/confirmNotice',
    method: 'post',
    data: {
      nid

    }
  })
}
