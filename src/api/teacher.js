import request from '@/utils/request.js'
// 获取教师信息列表
export const getTeacherInfoAPI = ({ currentPage, pageSize }) =>
  request({
    url: '/teacherInfo',
    method: 'get',
    params: {
      currentPage,
      pageSize
    }

  })
  // 搜索教师
export const searchTerInfoAPI = ({ tno, tname, tdept }) =>
  request({
    url: '/searchTerInfo',
    method: 'POST',
    data: {
      tno,
      tname,
      tdept
    }
  })
  // 修改教师信息
export const editTerInfoAPI = ({ tno, tname, tgender, tdept, title, tech }) =>
  request({
    url: '/editTerInfo',
    method: 'PUT',
    data: {
      tno,
      tname,
      tgender,
      tdept,
      title,
      tech
    }
  })
// 删除教师信息
export const deleteTerInfoAPI = ({ tno }) =>
  request({
    url: '/delTerInfo',
    method: 'DELETE',
    data: {
      tno
    }
  })

