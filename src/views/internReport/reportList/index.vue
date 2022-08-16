<template>
  <div>
    <el-card class="box-card">
       <el-button type="success" @click="goScoreClick" :disabled="role=='student'?true:false">去评分</el-button>
    </el-card>
     <el-card class="box-card">
       <el-table
      :data="reportList"
      border
      style="width: 100% ;text-align:center"
      >
      <el-table-column
        fixed
        prop="weeknum"
        label="周数"
        width="150"
        align="center"
        highlight-current-row="true">
        <template slot-scope="scope">
        第{{ scope.row.weeknum }}周
        <!-- <span style="margin-left: 10px"></span> -->
      </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="时间"
        width="120"
        align="center">
        <template slot-scope="scope">
         {{scope.row.starttime}}-{{scope.row.endtime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="project"
        label="实习项目"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="record"
        label="实习记录"
        width="400"
        align="center">
      </el-table-column>
      <el-table-column
        prop="experience"
        label="实习体会"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="difficulty"
        label="存在问题"
        width="200"
        align="center">
      </el-table-column> 
      <el-table-column
        prop="score"
        label="教师评分"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" size="small" @click="handleViewClick(scope.row)">查看</el-button>
          <el-button type="text" icon="el-icon-edit" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-popover
            placement="right"
            width="400"
            trigger="hover"
            :disabled="Boolean(scope.row.score)">
            <el-form :model="scoreForm" ref="scoreForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="评分">
                <el-input  v-model="scoreForm.score" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="评语">
                <el-input  v-model="scoreForm.comment" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="评分人">
                <el-input v-model="scoreForm.tname"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitScoreForm">提交</el-button>
                <el-button @click="resetScoreForm('scoreForm')">重置</el-button>
              </el-form-item>
            </el-form>
             <el-button slot="reference" :disabled="role=='student'?true:false" type="text" icon="el-icon-magic-stick" size="small" @click="handleScoreClick(scope.row)">评分</el-button>
          </el-popover>
           <!-- <el-button slot="reference" type="text" icon="el-icon-magic-stick" size="small" @click="handleScoreClick(scope.row)">评分</el-button> -->
        </template>
    </el-table-column>
  </el-table>
     </el-card>
     <!--  -->
     <!-- 预览 -->
      <reportPreview :dialogVisible="dialogVisible" :reportDetail="reportDetail" @closeEV="closeFn"></reportPreview>
      
  </div>
</template>

<script>
import reportPreview from '@/views/components/report-preview'
import {getStudentRepAPI} from '@/api/student'
import {setReportScoreAPI} from '@/api/report'
export default {
    data() {
      return {
        reportList:[],
        dialogVisible: false,
        reportDetail:{},
        sno:'', //学号,
        scoreForm:{ // 评分表单
          score:0,
          comment:'',
          tname:''
        },
        itemRow:{}, //当前操作列表 
        role:''
      }
    },
    async created(){
      console.log( this.$route.query.sno)
      this.getStudentRepFn()
      this.role = this.$store.state.user.userInfo.role
     
    },
     methods: {
      //  获取周报列表
      async getStudentRepFn(){
         if(this.$route.query.sno){ // 路由传参->非学生用户
            this.sno = this.$route.query.sno
          }else{
            this.sno = this.$store.state.user.userInfo.username
          }
          
          const res = await getStudentRepAPI({sno:this.sno})
          console.log("周报",res)
          this.reportList = res.data.list
      },
      //  查看周报
      handleViewClick(row) {
        console.log(row);
        this.reportDetail = row
        this.dialogVisible = true
      },
      // 编辑周报
      handleEditClick(row){
        console.log(row)
        this.$router.push({
          path:'/report/new',
          query:{
            sno:row.sno,
            weeknum:row.weeknum
          }
        })
      },
      // 周报评分
      handleScoreClick(row){
        console.log(row)
        this.itemRow = row
      },
      // // 提交分数
      async submitScoreForm(){
        
        console.log(this.scoreForm)
        const dataObj  =  {
          sno:this.$route.query.sno,
          weeknum:this.itemRow.weeknum,
          ...this.scoreForm
        }
        this.scoreForm.popoverShow  = true
        console.log("dataObj",dataObj)
        const res = await setReportScoreAPI(dataObj)
        if(res.data.code==200){
           this.$message({
          message: res.data.msg,
          type: 'success'
        });
        this.getStudentRepFn()
        }
      },
      // 重置
      resetScoreForm(formName) {
        console.log('重置')
        this.$refs[formName].resetFields();
      },
      // 去评分
      goScoreClick(){
        console.log('评分');
        this.$router.push({
          path:'/score/index',
          query:{
            sno:this.$route.query.sno
          }
        })
      },
      closeFn(){
        this.dialogVisible = false
      }
    },
    components: {
      reportPreview
    }

}
</script>

<style>
.box-card{
  margin: 10px;
}
</style>