import request from '@/utils/request'

export const getSnameAPI = ({ sno }) =>
  request({
    url: '/sco/getSname',
    method: 'post',
    data: {
      sno
    }
  })
// 评分
export const pustScoreAPI = ({ sno, sname, intermajor, internreport, internshow, totalScore }) =>
  request({
    url: '/sco/putScore',
    method: 'post',
    data: {
      sno,
      sname,
      intermajor,
      internreport,
      internshow,
      totalScore
    }
  })
  // 成绩单
export const getScoreListAPI = () =>
  request({
    url: '/sco/getScore',
    method: 'post'
  })
