<!--<template>-->
  <!--<div class='tinymce'>-->
    <!--<h1>tinymce</h1>-->
    <!--<editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>-->
    <!--<div v-html='tinymceHtml'></div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import tinymce from 'tinymce/tinymce'-->
  <!--import 'tinymce/themes/modern/theme'-->
  <!--import Editor from '@tinymce/tinymce-vue'-->
  <!--import 'tinymce/plugins/image'-->
  <!--import 'tinymce/plugins/link'-->
  <!--import 'tinymce/plugins/code'-->
  <!--import 'tinymce/plugins/table'-->
  <!--import 'tinymce/plugins/lists'-->
  <!--import 'tinymce/plugins/contextmenu'-->
  <!--import 'tinymce/plugins/wordcount'-->
  <!--import 'tinymce/plugins/colorpicker'-->
  <!--import 'tinymce/plugins/textcolor'-->
  <!--export default {-->
    <!--name: 'tinymce',-->
    <!--data () {-->
      <!--return {-->
        <!--tinymceHtml: '请输入内容',-->
        <!--init: {-->
          <!--language_url: '/static/tinymce/zh_CN.js',-->
          <!--language: 'zh_CN',-->
          <!--skin_url: '/static/tinymce/skins/lightgray',-->
          <!--height: 300,-->
          <!--plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',-->
          <!--toolbar:-->
            <!--'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',-->
          <!--branding: false-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--mounted () {-->
      <!--tinymce.init({})-->
    <!--},-->
    <!--components: {Editor}-->
  <!--}-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped>-->

<!--</style>-->

<template>
  <div class="app-container">
    <div>
      <!-- 组件有两个属性 value 传入内容双向绑定 setting传入配置信息 -->
      <editor class="editor" :value="content"  :setting="editorSetting" @input="(content)=> content = content"></editor>
    </div>

  </div>
</template>
<script>
  import editor from '@/components/editor'
  export default {
    name: "editor-demo",
    data: function () {
      return {
        content:'',
        //tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/
        editorSetting:{
          height:500,
        }
      }
    },
    components:{
      'editor':editor
    }
  }
</script>
<style scoped>
</style>

