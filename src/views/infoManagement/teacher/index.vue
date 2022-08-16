<template>
  <div>
    <!-- s搜索操作区域 -->
    <el-card class="box-card">
      <el-form ref="formTeacher" label-width="80px" :model="formTeacher">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item label="职工号">
              <el-input v-model="formTeacher.tno" />
            </el-form-item></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item label="职工姓名">
              <el-input v-model="formTeacher.tname" />
            </el-form-item></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item label="所在院系">
              <el-input v-model="formTeacher.tdept" />
            </el-form-item></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" />
            <el-form-item>
              <el-button type="primary" @click="searchForm()">搜索</el-button>
              <el-button @click="resetForm('formTeacher')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
    <!-- 内容区 -->
    <el-card class="box-card">
      <el-table
        :data="teacherList"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="tno"
          label="职工号"
          width="150"
        />
        <el-table-column
          prop="tname"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="tgender"
          label="性别"
          width="120"
        />
        <el-table-column
          prop="title"
          label="职称"
          width="120"
        />
        <el-table-column
          prop="tdept"
          label="院系"
          width="300"
        />
        <el-table-column
          prop="tech"
          label="技术专长"
          width="120"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-delete" size="small" circle @click="handleDelClick(scope.row)" :disabled="disabled">删除</el-button>
            <el-button type="text" icon="el-icon-edit" size="small" circle @click="editClick(scope.row)">编辑</el-button>
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
    <!-- 编辑 -->
    <editTeaInfo :dialogFormVisible="dialogFormVisible" :ruleData="ruleData" @closeEv="closeFn" @confirmEv="confirmEditFn"></editTeaInfo>
  </div>
</template>

<script>
import {getTeacherInfoAPI,searchTerInfoAPI,editTerInfoAPI,deleteTerInfoAPI} from '@/api/teacher'
import editTeaInfo from './components/editTeaInfo.vue'
export default {
  data() {
    return {
      formTeacher: {
        tno: '',
        tname: '',
        tdept: ''
      },
      teacherList: [], //教师信息列表
      currentPage: 1,
      pageSize:5,
      total:0,
      ruleData:{},
      dialogFormVisible:false,
      disabled:true
    }
  },
  async created(){
    this.getTeacherInfo() 
    console.log(this.$store.state.user.userInfo.username)
    console.log(this.$store.state.user.userInfo)
    const role = this.$store.state.user.userInfo.username
    if(role=='admin'){
      this.disabled = false
    }
  },
  methods: {
    // 获取教师信息
    async getTeacherInfo(){
      const res = await getTeacherInfoAPI({currentPage:this.currentPage,pageSize:this.pageSize})
      console.log("教师",res.data)
      this.teacherList = res.data.data
      this.total = res.data.total[0].total
    },
    // 搜索点击事件
    async searchForm() {
      console.log('搜索')
      console.log(this.formTeacher)
      if(this.formTeacher.tno==''){
         this.$message({
          showClose: true,
          message: '职工号必填哦~~',
          type: 'error'
        });
      }else{
        const res = await searchTerInfoAPI({...this.formTeacher})
        console.log("教师",res.data)
        this.teacherList = res.data.data
        this.total = res.data.data.length
      }
     
    },
    // 重置事件
    resetForm(formName) {
      console.log('重置')
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    },
    // 删除
    async handleDelClick(row) {
      console.log('删除')
      const res = await deleteTerInfoAPI({tno:row.tno})
      console.log(res)
       if(res.data.code ==200){
           this.$message({
          message: '删除成功',
          type: 'success'
        });
       }
       this.getTeacherInfo() 
    },
    // 编辑教师信息
    editClick(row) {
      console.log('编辑信息')
      this.ruleData = row
      this.dialogFormVisible = true
    },
    // 确认修改
    async confirmEditFn(obj){
       this.dialogFormVisible = false
       console.log(obj)
       const res = await editTerInfoAPI({...obj})
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
      this.getTeacherInfo() 
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
        this.currentPage = val
      // 再次渲染数据
      this.getTeacherInfo() 
    }

  },
  components:{
    editTeaInfo
  }
}
</script>

<style>
.box-card{
  margin: 10px;
}
.el-card__body{
  width: 1300px;
}

</style>
