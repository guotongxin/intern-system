import request from '@/utils/request.js'
// 填写实习信息

export const addInternMsgAPI = ({ sno, enterprise, address, nature, startTime, endTime, position }) => request({
  url: '/addInterMsg',
  method: 'POST',
  data: {
    sno,
    enterprise,
    address,
    nature,
    startTime,
    endTime,
    position
  }
})

// enterprise: '',address: '',nature:'',startTime: '', endTime: '', position:''
