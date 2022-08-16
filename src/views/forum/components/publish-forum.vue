<template>
   <div>
      <mavon-editor
            ref="md"
            placeholder="请输入文档内容..."
            :boxShadow="false"
            style="z-index:1;border: 1px solid #d9d9d9;width:80%;height:70vh;margin:10px auto;"
            v-model="content"
            :toolbars="toolbars"
        />
       <el-row style="margin-top: 26px;margin-bottom: 20px;text-align: center;">
          <el-button type="success" round @click="confirmPublishFn">发布论坛</el-button>
           <el-button type="warning" round @click="cancelPublishFn">取消发布</el-button>
            
       </el-row>
        
    </div>
</template>

<script>
// import marked from 'marked'
import {putForumtAPI} from '@/api/forum'
export default {
    data() {
      return {
        content: "",
        // markdown工具设置
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true // 预览
        }
      };
  },
   methods: {
    // 上传图片方法
    $imgAdd(pos, $file) {
      console.log(pos, $file);
    },
    // 取消发布
    cancelPublishFn(){
      console.log("取消发布");
      this.content=""
    },
    // 点击发布论坛
    async confirmPublishFn(){
      console.log(this.content);
      // console.log(marked);
      // 调用发布接口存储论坛信息
      const aut_name = this.$store.state.user.userInfo.username
      const res = await putForumtAPI({aut_name,content:this.content})
      console.log("论坛发布",res)
      this.$emit('publishEv',this.content)
      console.log("确认发布");
    },
  }
  
}
</script>

<style>

</style>