<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="论坛首页" name="first">
        
        <showForum :activeName="activeName" :forumLists="forumLists" @goPublishEV="goPublishFn"></showForum>
      </el-tab-pane>
      <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane> -->
      <el-tab-pane label="发布论坛" name="second">
        <publishForum @publishEv="publishFn" :activeName="activeName"></publishForum>
      </el-tab-pane>
      <el-tab-pane label="我的" name="third">
         <showForum :activeName="activeName" :forumLists="myForumLists"  @goPublishEV="goPublishFn"></showForum>
      </el-tab-pane>
  </el-tabs>
   
  
</template>

<script>
// 引入发布组件
import publishForum from './components/publish-forum'
//引入展示组件
import showForum from './components/show-forum'
import VueMarkdown from 'vue-markdown'
// import marked from 'marked'
import {getMyForumtAPI,getAllForumtAPI} from '@/api/forum'
export default {
    components:{
      publishForum,
      VueMarkdown,
      showForum
    },
    data() {
        return {
          activeName: 'first',
          forumCon:'',
          myforumCon:'',
          forumLists:[],
          myForumLists:[]
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        // 发布论坛
        publishFn(val){
          this.activeName = 'third'
          // this.content = marked(markdowncontent)
          // this.forumCon = marked.parse(val)
          this.forumCon = val
          this.myforumCon = val
           this.getMyForumListFn()
        },
        // 获取我的论坛
        async getMyForumListFn(){
          console.log("获取我的论坛执行")
          const aut_name = this.$store.state.user.userInfo.username
          const res = await getMyForumtAPI({aut_name})
          console.log("我的论坛",res)
          this.myForumLists = res.data.myforum

        },
        // 获取全部论坛
        async getAllForumListFn(){
          // const aut_name = this.$store.state.user.userInfo.username
          const res = await getAllForumtAPI()
          console.log("全部论坛",res,this.forumLists)
          this.forumLists = res.data.forum
        },
        goPublishFn(){
          this.activeName = 'second'
        }
      },
      created(){
        this.getMyForumListFn()
        this.getAllForumListFn()
       
      }
}
</script>

<style>
.aut{
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    margin-bottom: 30px;
}
.aut span{
  display: inline-block;
  height: 100%;
}
.aut::before{
  content: '';
  display: inline-block;
  width: 60px;
    height: 60px;
    border-radius: 50%;
  background: url(../../assets/photo.jpeg) no-repeat ;
  background-size: contain;
}
.con{
  text-indent: 2em;
}
.title {
    font-size: 24px;
    padding-left: 33px;
}
</style>
