<template>
  <div>
    <!-- 实习周报 -->
     <el-card class="box-card">
      <!-- 顶部提示 -->
      <el-row>
        <el-col :span="24" class="top_title">{{isEdit ?"修改":"填写"}}实习周报</el-col>
      </el-row>
      <hr class="hr-line" />
      <!-- 顶部提示 end -->
      <!-- 试题录入 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <!-- 第几周 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="周数" prop="weeknum">
              <el-input v-model="ruleForm.weeknum" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 时间 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="时间">
              <el-col >
                <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.starttime" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line"  style="margin-left: 25px;">-</el-col>
              <el-col >
                <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.endtime" style="width: 100%;"></el-date-picker>
              </el-col> 
            </el-form-item>
          </el-col>
          
        </el-row>
        <!-- 实习项目 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="实习项目" prop="project">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="ruleForm.project">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      
        <!-- 实习过程及方法-->
        <el-row>
          <el-col :span="12">
            <el-form-item class="stem " label="实习记录" prop="record">
              <quillEditor class="myQuillEditor" v-model="ruleForm.record"  :options="editorOption"></quillEditor>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 实习体会与收获 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="实习体会与收获" prop="experience">
              <el-input style="width: 100%" type="textarea"  v-model="ruleForm.experience"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 存在问题与困难 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="存在问题与困难" prop="difficulty">
              <el-input style="width: 100%" type="textarea" v-model="ruleForm.difficulty"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button v-if="isEdit" type="success" @click="editForm('ruleForm')"
            >确认修改</el-button>
          <el-button v-else type="primary" @click="submitForm('ruleForm')"
            >确认提交</el-button
          >
           <el-button type="info" @click="cancelFn('ruleForm')">取消{{isEdit ?"修改":"新增"}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 
import {getStudentRepAPI,addReportAPI,editReportAPI} from '@/api/student'
import moment from 'moment'
export default {
   
   components: {
    quillEditor
  },
  data() {
    return {
       ruleForm: {
        weeknum: '', // 周数
        starttime:'', //开始日期
        endtime:'',// 结束日期
        project:'',//实习项目
        record:'',//实习记录
        experience:'',//体会收获
        difficulty:''//困难
      },
      // 验证规则
       rules: {
        weekNum: [
          { required: true, message: '请输入周数', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请输入时间', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请输入实习项目', trigger: 'blur' }
        ],
        record: [
          { required: true, message: '请输入实习记录', trigger: 'blur' }
        ],
        experience: [{ required: true, message: '请输入体会收获', trigger: 'blur' }],
        difficulty: [
          { required: true, message: '请输入困难', trigger: 'change' }
        ]
      },
      // 富文本显示种类
      editorOption: {
        modules: {
          toolbar: [
            [
              'bold',
              'italic',
              'underline',
              'strike',
              { list: 'ordered' }, { list: 'bullet' },
              'blockquote',
              'code-block',
              'image',
              // 'video',
              'link'
            ]
          ]
        }
      },
      isEdit:false,
      sno:""
}
  },
  async created(){
    console.log(this.$route.query)
    if(this.$route.query.weeknum){
       this.isEdit = true
    // 获取周报内容
    const res = await getStudentRepAPI({...this.$route.query})
    // console.log(res)
    this.ruleForm = res.data.list[0]
    }
   
  },
  methods: {
    // 对表单时间数据进行处理
    formatFn(){
      for(let k in this.ruleForm){
        if(k=='starttime'||k=='endtime'){
          this.ruleForm[k] = moment(this.ruleForm[k]).format('YYYY-MM-DD')
        }
      }
    },
    // 提交
    async submitForm(formName){
      this.formatFn()
      if(this.$store.state.user.userInfo.role=='student'){
       this.sno = this.$store.state.user.userInfo.username
      }
     const res =  await addReportAPI({...this.ruleForm,sno:this.sno})
     console.log(res)
      if(res.data.code==200){
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: 'success'
        });
        this.ruleForm={
            weeknum: '', // 周数
            starttime:'', //开始日期
            endtime:'',// 结束日期
            project:'',//实习项目
            record:'',//实习记录
            experience:'',//体会收获
            difficulty:''//困难
          }
      }

    },
    // 编辑
    async editForm(formName){
      this.formatFn()
      const data = {...this.ruleForm,sno:this.$route.query.sno}
      const res = await editReportAPI(data)
      console.log(res)
      if(res.data.code==200){
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: 'success'
        });
        this.isEdit = false
        this.ruleForm={
            weeknum: '', // 周数
            starttime:'', //开始日期
            endtime:'',// 结束日期
            project:'',//实习项目
            record:'',//实习记录
            experience:'',//体会收获
            difficulty:''//困难
          }
      }
      
      // this.ruleForm.starttime =''
      // this.ruleForm.endtime = ''
      // this.$refs[formName].resetFields();
    },
    // 取消按钮
    cancelFn(formName){
      // 取消编辑
      if(this.isEdit){
         this.$nextTick(function(){
        this.$refs[formName].resetFields();
      })
        // 跳回列表页
        this.$router.push({
          path:'/report/list',
          query:this.$route.query

        })
      }else{ // 取消新增直接清空
      this.$nextTick(function(){
        //  console.log(this.$refs[formName])
        this.$refs[formName].resetFields();
      })

      }
      
    }
  },
 
}
</script>

<style scoped>
.box-card {
    padding: 5px 10px;
  }
.top_title {
  margin: 20px 0px 20px 0px;
}
/*  */
.hr-line {
  color: #ebeef5;
}
/* 富文本 */
 .myQuillEditor {
    width: 600px;
    height: 200px;
    display: block;
    margin-bottom: 60px;
}
</style>

