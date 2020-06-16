<template>
  <!-- 编辑器 -->
  <div>
    <!-- 工具栏容器 -->
    <div id="toolbar-container"></div>

    <!-- 编辑器容器 -->
    <div id="editor">
      <p>This is the initial editor content.</p>
    </div>

    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import documentEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
export default {
  data () {
    return {
      editor: documentEditor,
      editorData: '<p>Content of the editor.</p>'
    }
  },
  mounted () {
    this.initCKEditor()
  },
  methods: {
    initCKEditor () {
      documentEditor
        .create(document.querySelector('#editor'), {
          language: 'zh-cn',
          ckfinder: {
            // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
            uploadUrl: '/api/admin/upload-img'
          }
        })
        .then(editor => {
          const toolbarContainer = document.querySelector('#toolbar-container')
          toolbarContainer.appendChild(editor.ui.view.toolbar.element)
          this.editor = editor // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        })
        .catch(err => {
          console.error('初始化错误')
        })
    },
    submit () {
      const content = this.editor.getData()
      console.log(content)
    }
  }
}
</script>
<style lang='scss' scoped>
#editor { min-height: 300px; }
</style>
