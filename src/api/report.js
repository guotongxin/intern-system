import request from '@/utils/request.js'
// 周报评分
export const setReportScoreAPI = (dataObj) =>
  request({
    url: '/rep/reportscore',
    method: 'post',
    data: dataObj
  })

