<template>
<!-- 发布人 发布时间  -->
  <div>
      <el-dialog title="发布公告" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="公告主题" :label-width="formLabelWidth">
             <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" :label-width="formLabelWidth">
                 <el-input v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelFn">取 消</el-button>
            <el-button type="primary" @click="comfirmfn">确 定</el-button>
        </div>
        </el-dialog>
  </div>
</template>

<script>

import moment from 'moment';
export default {
    data(){
        return{
            form: {
            title: '',
            content: '',
            },
            date:+new Date(),
            name:'',
            formLabelWidth: '120px'
        }
    },
    props:{
         dialogFormVisible:{
             default: false,
             type:Boolean
         }
    },
    created(){
     console.log(this.$store.state.user.userInfo.username)
     this.name = this.$store.state.user.userInfo.username
    },
    methods:{
        cancelFn(){
            this.$emit("closeEv")
        },
        async comfirmfn(){
          this.date =  moment(this.date).format('YYYY-MM-DD')
          console.log(this.form)
          console.log(this.$store.state.user.userInfo)
          this.$emit("confirmEv",this.date,this.name,this.form)

        }
    }

}
</script>

<style>

</style>