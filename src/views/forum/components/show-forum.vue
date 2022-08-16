<template>
  <!-- 论坛每一条 -->
        <div class="forumBox">
          <div class="defauleText" v-if="forumLists.length ==0">
            <div style="text-align:center;">你还未发布过论坛，快去发布吧！</div>
            <div style="text-align:center;margin-top: 20px;"  @click="goPublishFn">去发布</div>
          </div>
          <div v-else class="forumItem" v-for="(obj,index) in forumLists" :key="index">
            <el-card class="box-card">
               <!-- 作者 -->
            <div class="aut">
              <span>{{obj.aut_name}}</span>
            </div>
            <div class="title">{{obj.art_title}}</div>
              <VueMarkdown class="con" :source="obj.content"></VueMarkdown>
              <div class="btn">
                <el-button style="float:right;margin-bottom:20px;" type="primary" size="mini" @click="commonFn">评论</el-button>
              </div>
            </el-card>
           
          </div>

        </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
     components:{
      VueMarkdown
    },
    props:{
      forumLists:{
        type:Array,
        default:[]
      },
      activeName:{
        type:String
      }
    },
    methods:{
      goPublishFn(){
        this.$emit("goPublishEV")
      },
      // 评论
       commonFn() {
        this.$prompt('请输入评论内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '评论成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消评论'
          });       
        });
      }
    }

}
</script>

<style>
.box-card{
  width: 1300px;
}

</style>