<template>
  <div>
    <!-- s搜索操作区域 -->
    <el-card class="box-card">
      <el-form ref="formStudent" label-width="80px" :model="formStudent">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item label="学号">
              <el-input v-model="formStudent.sno" />
            </el-form-item></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item label="姓名">
              <el-input v-model="formStudent.sname" />
            </el-form-item></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item label="所在院系">
              <el-input v-model="formStudent.sdept" />
            </el-form-item></el-col>
            <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item label="指导教师">
              <el-input v-model="formStudent.stutor" />
            </el-form-item></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item>
              <el-button type="primary" @click="searchForm()">搜索</el-button>
              <el-button @click="resetForm('formStudent')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
    <!-- 内容区 -->
    <el-card class="box-card">
      <el-table
        :data="studentList"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="sno"
          label="学号"
          width="120"
        />
        <el-table-column
          prop="sname"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
        />
        <el-table-column
          prop="sdept"
          label="院系"
          width="200"
        />
         <el-table-column
          prop="sclass"
          label="班级"
          width="120"
        />
         <el-table-column
          prop="sphone"
          label="联系方式"
          width="120"
        />
        <el-table-column
          prop="tname"
          label="指导教师"
          width="200"
        />
        <el-table-column
          prop="smajor"
          label="专业"
          width="120"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" size="small" circle @click="handleClick(scope.row)">查看周报列表</el-button>
            <el-button type="text" icon="el-icon-edit" size="small" circle @click="editClick(scope.row)">编辑信息</el-button>
             <el-button type="text" icon="el-icon-delete" size="small" circle @click="delClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px; text-align: right;"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <editStuInfo
      :dialogFormVisible="dialogFormVisible" :ruleData="ruleData"
      @closeEv="closeFn" @confirmEv="confirmEditFn"
    ></editStuInfo>
  </div>
</template>

<script>
import {getStudentInfoAPI,searchStuInfoAPI,deleteStuInfoAPI,editStuInfoAPI} from '@/api/student'
import editStuInfo from './components/editStuInfo.vue'
export default {
  data() {
    return {
      // labelPosition: 'right',
      formStudent: {
        sno: '',
        sname: '',
        sdept: '',
        stutor:''//指导教师
      },
     studentList:[],
      currentPage: 1,
      pageSize:5,
      total:0,
      ruleData:{},
      dialogFormVisible:false,
      disabled:true
    }
  },
  async created(){
     // 渲染初始数据
    this.getStudentInfoFn()
  },
  methods: {
    // 获取学生信息
    async getStudentInfoFn(){
      const res = await getStudentInfoAPI({currentPage:this.currentPage,pageSize:this.pageSize})
      console.log("学生信息",res.data)
      this.studentList = res.data.list
      this.total = res.data.total[0].total
    },
    // 搜索
    async searchForm() {
      console.log('搜索')
      console.log(this.formStudent)
      if(this.formStudent.sno==''){
         this.$message({
          showClose: true,
          message: '学号必填哦~~',
          type: 'error'
        });
      }else{
        const res = await searchStuInfoAPI({...this.formStudent})
        console.log("学生",res.data)
        this.studentList = res.data.data
        this.total = res.data.data.length
      }
    },
    // 重置搜索
    resetForm(formName) {
      console.log('重置')
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    },
    // 查看周报
    handleClick(row) {
      console.log('查看信息',row)
      this.$router.push({
        path:`/report/list?sno=${row.sno}`
        
      })
    },
    // 编辑信息
    editClick(row) {
      console.log('编辑信息')
       this.ruleData = row
      this.dialogFormVisible = true
    },
    // 删除信息
    async delClick(row){
      console.log("删除");
      const res = await deleteStuInfoAPI({sno:row.sno})
      console.log(res)
       if(res.data.code ==200){
           this.$message({
          message: '删除成功',
          type: 'success'
        });
       }
       this.getStudentInfoFn() 
      
    },
     // 确认修改
    async confirmEditFn(obj){
       this.dialogFormVisible = false
       console.log(obj)
       const res = await editStuInfoAPI({...obj})
       console.log(res)
       if(res.data.code ==200){
           this.$message({
          message: '修改成功',
          type: 'success'
        });
       }
    },
    // 关闭弹框
    closeFn(){
       this.dialogFormVisible = false
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      // 再次渲染数据
       this.getStudentInfoFn()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      // 再次渲染数据
       this.getStudentInfoFn()
    }

  },
   components:{
    editStuInfo
  }
}
</script>

<style scope>
.box-card{
  margin: 10px;
}
::deep.el-card__body{
  width: 1300px;
}

</style>
