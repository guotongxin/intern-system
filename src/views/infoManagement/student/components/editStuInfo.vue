<template>
  <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible" @closed="cancelClickFn">
    <!-- 学生信息修改 -->
     
      <hr class="hr-line" />
      <!-- 顶部提示 end -->
      <!-- 信息表单 -->
      <el-form
        :model="ruleData"
        ref="ruleData"
        label-width="120px"
      >
        <!-- 学号 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="学号" prop="sno">
              <el-input v-model="ruleData.sno" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 姓名 -->
        <el-row>
          <el-col :span="12">
             <el-form-item label="姓名" prop="sname">
                <el-input v-model="ruleData.sname" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 性别 -->
        <el-row>
          <el-col :span="12">
             <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleData.sex" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 院系 -->
        <el-row>
          <el-col :span="12">
             <el-form-item label="院系" prop="sdept">
                <el-input v-model="ruleData.sdept" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 班级 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="班级" prop="sclass">
              <el-input style="width: 100%" v-model="ruleData.sclass"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 联系方式 -->
         <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="sphone">
              <el-input style="width: 100%" v-model="ruleData.sphone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 指导教师 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="指导教师" prop="stutor">
              <el-input style="width: 100%" v-model="ruleData.stutor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <!-- 指导教师 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="专业" prop="smajor">
              <el-input style="width: 100%" v-model="ruleData.smajor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancelClickFn">取 消</el-button>
          <el-button type="primary" @click="confirmClickFn">确 定</el-button>
        </div>
  </el-dialog>
</template>

<script>
export default {
  props:{
     ruleData:{
        type:Object,
        default:{
          sno:"",
          sname:'',
          sex:'',
          sdept:'',
          sclass:'',
          smajor:'',
          stutor:'',
          sphone:'',
        }
     },
     dialogFormVisible:{
      type:Boolean,
      default:false
    }
    
  },
  data(){
    return{
    
    }
  },
  methods:{
     cancelClickFn(){
      // dialogFormVisible = false
      this.$emit('closeEv')
    },
     confirmClickFn(){
      console.log(this.ruleData)
      this.$emit("confirmEv",this.ruleData)
    }
  }

}
</script>

<style>

</style>