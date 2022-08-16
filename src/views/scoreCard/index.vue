<template>
<div>
  <el-card class="box-card">
  <el-button type="success" @click="exportout">导出</el-button>
  </el-card>
  <el-card class="box-card">
    <el-table
    :data="tableData"
    style="width: 100%"
    id="scoreResult"
    :default-sort = "{prop: 'total', order: 'descending'}"
    >
      <el-table-column
        prop="sno"
        label="学号"
        width="100">
      </el-table-column>
       <el-table-column
        prop="sname"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="intermajor"
        label="专业实习"
        width="180">
      </el-table-column>
      <el-table-column
        prop="internreport"
        label="实习周报"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="internshow"
        label="个人表现"
        width="180"
        >
        </el-table-column>
        <el-table-column
        prop="totalScore"
        label="总分"
        width="180"
        sortable
        ></el-table-column>
    </el-table>
  </el-card>
</div>

  
</template>

<script>
import {getScoreListAPI} from '@/api/score'
export default {
    data() {
      return {
        tableData: [
        ]
      }
    },
    created(){
      this.getScoreListFn()
    },
    methods: {
      // 渲染数据
      async getScoreListFn(){
        const res = await getScoreListAPI()
        console.log("获取成绩单",res)
        this.tableData = res.data.list
      },
      // 点击导出按钮
      exportout(){
        this.exportExcel()
      },
      // 导出为excel
      exportExcel() {
        console.log(this)
      this.tableToExcels.exportExcel("学生成绩单.xlsx", "#scoreResult");
      //第一个引号里面是表格导出时的名字
      //第二个是表格的id，这个插件是通过id导出的
    }
  }
}
</script>

<style>
 .box-card {
    width: 880px;
    margin: 10px;
  }
</style>