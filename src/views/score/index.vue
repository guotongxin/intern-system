<template>
  <div>
    <el-card>
      评分
    </el-card>
    <div class="score_con"> 
       <el-card class="box-card">
       <el-form  :model="formData" label-width="80px">
      <!-- 专业实习 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="专业实习">
            <el-input v-model.number="formData.intermajor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <!-- <el-input v-model="intermajorRate"></el-input> -->
      <!-- 实习周报 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="实习周报">
            <el-input v-model.number="formData.internreport"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-input v-model="internreportRate"></el-input> -->
      <!-- 个人表现 -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="个人表现">
            <el-input v-model.number="formData.internshow"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-input v-model="internshowRate"></el-input> -->
      <!-- 总分 -->
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="总分">
            <el-input v-model.number="formData.total"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-input v-model="form.intermajor"></el-input> -->
      <el-form-item>
        <div>总分：{{totalScore}}</div>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    </el-card>
    <!-- 图标 -->
    <div id="echart">

    </div>
    </div>
   
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {pustScoreAPI,getSnameAPI} from '@/api/score.js'
export default {
 
  data(){
     
    return {
      formData:{
        intermajor:null,
        internreport:null,
        internshow:null,
      },
      intermajorRate:0.4,
      internreportRate:0.4,
      internshowRate:0.2,
      // totalScore:0,
      sname:''
    }
  },
  mounted(){
    this.drawPie()
  },
  created(){
    this.getSnameFn()
  },
  methods: {
    drawPie() {
       var myChart = echarts.init(document.getElementById('echart'));
        myChart.setOption({
          title: {
          text: '学生成绩占比图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['专业实习', '实习周报', '个人表现']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 40, name: '专业实习' },
              { value: 40, name: '实习周报' },
              { value: 20, name: '个人表现' }
            ]
          },
        ],
        })

    },
    async getSnameFn(){
      const res = await getSnameAPI({sno:this.$route.query.sno})
      console.log('姓名',res)
      this.sname = res.data.sname
    },
    async onSubmit(){
      console.log("提交");
      // 获取学生学号
      const sno = this.$route.query.sno
      console.log(sno)
      console.log(this.formData)
      console.log(this.totalScore)
      // 
      const res = await pustScoreAPI({sno,...this.formData,totalScore:this.totalScore,sname:this.sname}) 
      console.log("提交成绩",res)
      if(res.status == 200){
         this.$message.success(res.data.msg);

      }
    }
  },
  computed:{
   totalScore:function(){
     return this.formData.intermajor *0.4 +this.formData.internreport *0.4+this.formData.internshow *0.2

    }
  },
  watch:{
    form:{
      handler(newValue) {
        console.log("NEW:", newValue);
        // this.form.total = 
        for(let k in newValue){
          if(k!='total'){
            this.totalScore+=newValue[k]
            console.log(this.totalScore)
          }
          
        }
      },
      deep: true,
    }
  }
}
</script>

<style>
  .box-card {
    width: 680px;
    margin: 10px;
  }
  .score_con{
    display: flex;

  }
 #echart {
    width: 500px;
    height: 400px;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 2px 2px 10px #e5e4e4;
}
</style>