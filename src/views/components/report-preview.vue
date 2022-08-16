<template>
   <div class="container">
    <el-dialog
      title="实习周报"
      :visible.sync="dialogVisible"
      width="90%"
      @close="handleClose"
    >
      <!-- 描述列表 -->
      <el-descriptions :column=1 size="small">
        <el-descriptions-item label="【周数】">第{{reportDetail.keeknum}}周</el-descriptions-item> 
        <el-descriptions-item label="【时间】">{{reportDetail.starttime}}-{{reportDetail.endtime}}</el-descriptions-item>
        <el-descriptions-item label="【实习项目】">{{reportDetail.project}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical">
        <el-descriptions-item label="【实习记录】" contentStyle="padding: 0px 30px;">{{reportDetail.record}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="【实习体会与收获】">{{reportDetail.experience}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions>
        <el-descriptions-item label="【存在问题及困难】">{{reportDetail.difficulty}}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible:{
      type:Boolean,
      default:false
    },
    reportDetail:{
      type:Object,
      default:{}
    }
  },
  methods:{
    handleClose() {
      this.$emit("closeEV")
  }
  }
}
</script>

<style>

</style>