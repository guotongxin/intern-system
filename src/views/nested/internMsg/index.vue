<template>
  <!-- 实习信息填写 -->
  <!-- 企业 地点 开始时间 结束时间 实习岗位 -->
  <div style="padding:30px;">
    <el-form label-position="right" ref="formLabel" label-width="80px" :model="formLabel">
      <el-form-item label="实习企业">
        <el-input v-model="formLabel.enterprise"></el-input>
      </el-form-item>
      <el-form-item label="实习地点">
        <el-input v-model="formLabel.address"></el-input>
      </el-form-item>
      <el-form-item label="企业性质">
        <el-input v-model="formLabel.nature"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="formLabel.startTime"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
       <el-date-picker
          v-model="formLabel.endTime"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实习岗位">
        <el-input v-model="formLabel.position"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
        <el-button @click="onCancel('formLabel')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import moment from 'moment'
import {addInternMsgAPI} from '@/api/internship'
export default {
  data(){
    return {
      formLabel: {
         enterprise: '', // 实习企业
         address: '', // 实习地址
         nature:'',// 企业性质
         startTime: '', //开始时间
         endTime: '', //结束时间
         position:'' //实习岗位
      }
    }
  },
  methods:{
   async onSubmit(){
      console.log('提交');
      // console.log("实习信息表单内容",this.formLabel);
      // 处理时间
      for(let key in this.formLabel){
        if(key=='startTime'||key=='endTime'){
          // 处理时间
          this.formLabel[key] = moment( this.formLabel[key]).format('YYYY-MM-DD')
        }
      }
      // console.log("时间处理",this.formLabel);
      // 获取学号
      // console.log('用户名',this.$store.state.user.userInfo.username)
      const sno = this.$store.state.user.userInfo.username
      console.log("学号",sno,this.formLabel)
      const res = await addInternMsgAPI({sno:sno,...this.formLabel})
      console.log('实习信息填写成功',res);
      if(res.status == 200){
         this.$message.success(res.data.msg);
        //  this.formLabel
         this.$refs.formLabel.resetFields();

      }
      
      // 填写成功
    },
    onCancel(formName){
      console.log("取消");
      console.log(this.$refs[formName])
      this.$nextTick(function(){
       this.$refs[formName].resetFields();
       this.formLabel={
         enterprise: '', // 实习企业
         address: '', // 实习地址
         nature:'',// 企业性质
         startTime: '', //开始时间
         endTime: '', //结束时间
         position:'' //实习岗位
      }
    })
       
      
    }
  }
}
</script>

<style scoped>

</style>
