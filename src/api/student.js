import request from '@/utils/request.js'
// 获取信息列表
export const getStudentInfoAPI = ({ currentPage, pageSize }) =>
  request({
    url: '/studentInfo',
    method: 'get',
    params: {
      currentPage,
      pageSize
    }
  })
export const searchStuInfoAPI = ({ sno, sname, sdept, stutor }) =>
  request({
    url: '/searchStuInfo',
    method: 'POST',
    data: {
      sno,
      sname,
      sdept,
      stutor
    }
  })
// 周报信息列表
export const getStudentRepAPI = ({ sno, weeknum }) =>
  request({
    url: '/reportList',
    method: 'post',
    data: {
      sno,
      weeknum
    }
  })
// 添加周报
export const addReportAPI = ({ sno, weeknum, starttime, endtime, project, record, experience, difficulty }) =>
  request({
    url: '/addReport',
    method: 'post',
    data: {
      sno,
      weeknum,
      starttime,
      endtime,
      project,
      record,
      experience,
      difficulty
    }
  })
// 修改周报
// 添加周报
export const editReportAPI = ({ sno, weeknum, starttime, endtime, project, record, experience, difficulty }) =>
  request({
    url: '/editReport',
    method: 'post',
    data: {
      sno,
      weeknum,
      starttime,
      endtime,
      project,
      record,
      experience,
      difficulty
    }
  })
// 编辑学生editStuInfoAPI
export const editStuInfoAPI = ({ sno, sname, sex, sdept, sclass, smajor, stutor, sphone }) =>
  request({
    url: '/editStuInfo',
    method: 'PUT',
    data: {
      sno,
      sname,
      sex,
      sdept,
      sclass,
      smajor,
      stutor,
      sphone
    }
  })
  // 删除信息deleteStuInfoAPI(完善)
export const deleteStuInfoAPI = ({ sno }) =>
  request({
    url: '/delStuInfo',
    method: 'DELETE',
    data: {
      sno
    }
  })
