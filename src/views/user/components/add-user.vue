<template>
  <div>
    <!-- 添加用户 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="cancleAddFn">取 消</el-button>
        <el-button type="primary" @click="confirmAddFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addUserAPI} from '@/api/user'
export default {
  props:{
    dialogFormVisible:{
      default:false,
      type:Boolean
    }
  },
  data(){
    return{
      form:{
        username:'',
        password:'',
        role:''
      },
      formLabelWidth: '120px'
      
    }
  },
  methods:{
    cancleAddFn(){
      this.$emit('closeAddEv')
    },
    async confirmAddFn(){
      const res = await addUserAPI({...this.form})
      console.log(res)
     
      this.$emit('confirmAddEv')
       if(res.data.code == 200 ) this.$message.success(res.data.msg);
      console.log(this.form)
    }
  }

}
</script>

<style>

</style>