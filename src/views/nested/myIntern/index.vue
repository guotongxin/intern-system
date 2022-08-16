<template>
  <div style="padding:30px;">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="enterprise"
        label="实习企业"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="实习地点"
        width="200">
      </el-table-column>
      <el-table-column
        prop="nature"
        label="企业性质"
        width="120">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="position"
        label="实习岗位"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button @click="handleEditClick(scope.row)"  type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return {
      tableData:[
        {
          entId:1,
          enterprise: 'sddd',
          address: 'sdf我发不是吧吧是额外的问答所选直接发给不',
          nature: '爱上啥第三方是',
          startTime: '2021-10-5',
          endTime: '2021-11-10',
          position: 'wwwwddwdv'
        },
        {
          entId:2,
          enterprise: 'sddd',
          address: 'sdf我发不是吧吧是额外的问答所选直接发给不',
          nature: '爱上啥第三方是',
          startTime: '2021-10-5',
          endTime: '2021-11-10',
          position: 'wwwwddwdv'
        }
      ]

    }
  },
  methods:{
    handleEditClick(row){
      console.log(row);
    }

  }
  
}
</script>
<style >

</style>
