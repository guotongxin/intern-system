<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>公告栏</span>
        <!-- <el-button style="float: right; margin-right:20px;" type="info" :disabled="isStudent">删除公告</el-button> -->
        <el-button style="float: right; margin-right:20px;" :disabled="isDisabled" type="success" @click="addNoticeFn" >新增公告</el-button>
      </div>
      <div class="text item">
        <el-table
          :data="noticeList"
          border
          style="width:100%;"
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column
            type="index"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="发布日期"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="发布人"
            width="120">
          </el-table-column>
         <el-table-column
            prop="title"
            label="公告标题"
            width="200">
          </el-table-column>
          <el-table-column
            prop="content"
            label="公告内容"
            width="400">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" :disabled="scope.row.status==='true'?true:false" @click="confirmNoticeFn(scope.row)">确认公告</el-button>
              <el-button  type="text" size="small" @click="handleDelClick(scope.row)" :disabled="isDisabled">删除</el-button>
              <!-- <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 新增公告弹框 -->
    <addNotice :dialogFormVisible="dialogFormVisible" :isEdit="isEdit" @closeEv= "colseDiaFn" @confirmEv="confirmDiaFn(arguments)"></addNotice>
  </div>
</template>

<script>
import addNotice from './components/notice-add'
import {getNoticeListAPI,addNoticeListAPI,delNoticeAPI,confirmNoticeAPI} from '@/api/notice'

import moment from 'moment';
// import {} from '@/api/user'
export default {
  components:{
    addNotice
  },
  data(){
    return{
      dialogFormVisible:false, //新增弹框
      // isStudent:false, // 判断身份
      noticeList:[], // 公告列表
      isEdit:false, //是否编辑状态
      isDisabled:false //是否可以编辑
    }
  },
  created(){
    this.getNoticeList()
    // 更新用户信息getLoginUserInfo
    // this.$store.dispatch("user/getLoginUserInfo")
    const userRole = this.$store.state.user.userInfo.role
    if(userRole=='student'){
      this.isDisabled = true
    }
  },
  methods:{
    // 获取公告列表
    async getNoticeList(){
      const res = await getNoticeListAPI()
      console.log(res)
      this.noticeList = res.data.noticeData
      // 对公告的时间进行格式化
       this.noticeList = this.noticeList.map(item=>{
        //  console.log(item)
         for(let key in item){
           if(key=='date'){
            //  格式化时间
             item[key]=moment(item[key]).format('YYYY-MM-DD')
           }
         }
        //  console.log('llaa',item)
         return item
       })
       console.log('处理', this.noticeList)
    },
    // 点击新增公告
    addNoticeFn(){
      // 弹框显示
      this.dialogFormVisible= true
    },
    // 关闭弹框
    colseDiaFn(){
      this.dialogFormVisible=false
    },
    // 确认新增
    async confirmDiaFn(msg){
      console.log(msg)
      const date =msg[0]
      const name = msg[1]
      const form = msg[2]
      // console.log(...form)
      const res = await addNoticeListAPI({date,name,...form})
      console.log(res)
      if(res.data.code==200){
        this.$message({
          message: `${res.data.msg}`,
          type: 'success'
        });
      }
      this.dialogFormVisible=false
      this.getNoticeList()
    },
    // 确认公告
    async confirmNoticeFn(row){
      const res = await confirmNoticeAPI({nid:row.nid})
      // console.log("确认成功",row)
      if(res.data.code == 200)
       this.$message.success(res.data.msg);
        this.getNoticeList()
    },
    // 编辑
    // handleEditClick(row){
    //   console.log(row);
    //   // 显示弹框
    //   this.dialogFormVisible = true
    //   // 编辑状态
    //   this.isEdit = true

    // },
    // 删除公告
    async handleDelClick(row){
      console.log('删除公告',row);
      const res = await delNoticeAPI({...row})
      console.log('删除公告',res)
      if(res.data.code == 200)
      this.$message.success(res.data.msg);
      // 删除后重新渲染
      this.getNoticeList()
    }
  }

}
</script>

<style>
.box-card{
  margin: 10px;
}
</style>