<template>
  <div>
      <!-- 显示出教师和学生 新增员工 -->
      <el-card class="box-card">
       <el-alert
          :title="title"
          type="info"
          show-icon
          :closable="false"
          style="width:150px;height:40px;float:left;margin-right:30px;">
        </el-alert>
        <el-button type="success" @click="addUserFn">新增用户</el-button>
      
      </el-card>
      <!-- 内容区 -->
      <el-card class="box-card">
        <el-table
          :data="tableData"
          border
          style="width: 50%">
          <el-table-column
            fixed
            prop="username"
            label="用户名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClickViewFn(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="handleEditFn(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <addUser :dialogFormVisible="dialogFormVisible" @closeAddEv="closeAddFn" @confirmAddEv="confirmAddFn"></addUser>
      <!-- 分页 -->
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 编辑 -->
      <el-dialog title="编辑用户信息" :visible.sync="dialogEditVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
             <el-select v-model="form.role" placeholder="请选择角色">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="教师" value="teacher"></el-option>
              <el-option label="学生" value="student"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEditVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {getUserInfoAPI} from '@/api/user'
import addUser from './components/add-user.vue'
export default {
  data(){
    return {
      tableData:[],// 表格数据
      dialogFormVisible:false,// 新增弹框显示
      currentPage: 1, //当前页
      pageSize:5, // 一夜条数
      total:0,
      title:'共0条数据',
      dialogEditVisible: false,
        form: {
          name: '',
          pass:'',
          role:'s'
        },
        formLabelWidth: '120px'

    }
  },
  async created(){
    // 获取用户信息
    console.log(this.pageSize,this.currentPage)
   this.getUserInfoFn()
  },
  methods:{
    async getUserInfoFn(){
      const res = await getUserInfoAPI({pageSize:this.pageSize,currentPage:this.currentPage})
      console.log(res)
      this.tableData = res.data.infoData
      this.total = res.data.total[0].total
      this.title = `共${this.total}条数据`
    },
    // 新增用户
    addUserFn(){
      this.dialogFormVisible=true
    },
    // 关闭弹框
    closeAddFn(){
      this.dialogFormVisible=false
    },
    confirmAddFn(){
      this.getUserInfoFn()
      this.dialogFormVisible=false
    },
    // 查看用户
    handleClickViewFn(row){
      console.log("chakan ")
      this.$alert(`用户名：${row.username},密码：${row.password},角色：${row.role}`, '查看资料', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
    },
    // 编辑
    handleEditFn(row){
      this.dialogEditVisible = true
      console.log(row)
      this.form.name = row.username
      this.form.pass = row.password
      this.form.role = row.role

    },
    // 分页
    // 条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getUserInfoFn()
    },
    // 页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getUserInfoFn()
    }
  },
  components:{
    addUser
  }

}
</script>

<style>
 .box-card{
   margin: 10px;
 }

</style>