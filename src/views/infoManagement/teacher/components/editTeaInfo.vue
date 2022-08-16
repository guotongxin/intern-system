<template>
  <el-dialog title="修改教师信息" :visible.sync="dialogFormVisible" @closed="cancelClickFn">
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
            <el-form-item label="职工号" prop="sno">
              <el-input v-model="ruleData.tno" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 姓名 -->
        <el-row>
          <el-col :span="12">
             <el-form-item label="姓名" prop="tname">
                <el-input v-model="ruleData.tname" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 性别 -->
        <el-row>
          <el-col :span="12">
             <el-form-item label="性别" prop="tgender">
              <el-select v-model="ruleData.tgender" placeholder="请选择活动区域">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 院系 -->
        <el-row>
          <el-col :span="12">
             <el-form-item label="院系" prop="tdept">
                <el-input v-model="ruleData.tdept" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 班级 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="职称" prop="title">
              <el-input style="width: 100%" v-model="ruleData.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 联系方式 -->
         <el-row>
          <el-col :span="12">
            <el-form-item label="技术专长" prop="tech">
              <el-input style="width: 100%" v-model="ruleData.tech"></el-input>
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
        tno:"", //职工号
        tname:'',//姓名
        tgender:'',//性别
        tdept:'',//院系
        title:'',//职称
        tech:'' //技术专长
      }
    },
    dialogFormVisible:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      // ruleForm:
    }
  },
  created(){
    // this.ruleForm = 
    console.log(this.ruleData)
  },
  methods:{
    // 
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