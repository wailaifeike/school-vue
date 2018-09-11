<template>
  <textarea :id='id' :value='value'></textarea>
</template>

<script>
  // Import TinyMCE
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/modern/theme'
  import 'tinymce/plugins/advlist' // 这几条引入是因为我的导入不了，不知道为啥
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/colorpicker'

  const INIT = 0
  const CHANGED = 2
  // var EDITOR = null
  export default {
    props: {
      value: {
        type: String,
        editor: null,
        required: true
      },
      setting: {},
      url: { // 接口
        default: '',
        type: String
      },
      accept: { // 文件类型
        default: 'image/jpeg, image/png',
        type: String
      },
      maxSize: { // 大小
        default: 2097152,
        type: Number
      },
      withCredentials: {
        default: false,
        type: Boolean
      }
    },
    watch: {
      value: function(val) {
        console.log('init ' + val)
        if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
          tinymce.activeEditor.setContent(val)
        }
        this.status = CHANGED
      }
    },
    data() {
      return {
        status: INIT,
        id: 'editor-' + new Date().getMilliseconds(),
        imgurl:"http://127.0.0.1:8010/upload/"
      }
    },
    methods: {
    },
    mounted() {
      const _this = this
      const setting =
        {
          selector: '#' + _this.id,
          height:300,
          upload_image_url: 'http://127.0.0.1:8010/upload/', // 配置的上传图片的路由
          file_picker_types: 'file image media',
          //file_browser_callback_types: 'file image media',// type of file
          //file_browser_callback_types: 'file image media',
          language: 'zh_CN',
          init_instance_callback: function(editor) {
            // EDITOR = editor
            console.log('Editor: ' + editor.id + ' is now initialized.')
            editor.on('input change undo redo', () => {
              var content = editor.getContent()
              _this.$emit('show', content)
            })
          },
          content_style: `
              *                         { padding:0; margin:0; }
              html, body                { height:100%; }
              img                       { max-width:100%; display:block;height:auto; }
              a                         { text-decoration: none; }
              iframe                    { width: 100%; }
              p                         { line-height:1.6; margin: 0px; }
              table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
              .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
              ul,ol                     { list-style-position:inside; }
          `,
            insert_button_items: 'image link | inserttable',
            paste_retain_style_properties: 'all',
            paste_word_valid_elements: '*[*]', // word需要它
            paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
            paste_convert_word_fake_lists: false, // 插入word文档需要该属性
            paste_webkit_styles: 'all',
            paste_merge_formats: true,
            nonbreaking_force_tab: false,
            paste_auto_cleanup_on_paste: false,
            insertdatetime_element: true,


            'plugins': [
              'advlist link image',

              'media',
              'insertdatetime',
              'code',
              'table textcolor paste textcolor colorpicker'
            ], // 配置
            'toolbar_items_size': 'small',
            'block_formats': 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
            'toolbar1': 'table |insertfile undo redo | formatselect | link unlink | uploadimg image media', // 工具栏1
            'toolbar2': ' fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat', // 工具栏2
          // 图片上传
          // images_upload_handler: function(blobInfo, success, failure) {
          //   // failure(blobInfo)
          //   // _this.$emit('on-ready', blobInfo.blob().size, blobInfo.blob())
          //   if (blobInfo.blob().size > _this.maxSize) {
          //     failure('文件体积过大')
          //   }
          //   if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
          //     uploadPic()
          //   } else {
          //     failure('图片格式错误')
          //   }
          //
          //   function uploadPic() { // 发送请求
          //     const xhr = new XMLHttpRequest()
          //     const formData = new FormData()
          //     xhr.withCredentials = _this.withCredentials
          //     xhr.open('POST', _this.url)
          //     xhr.onload = function() {
          //       failure('上传---' + xhr.status)
          //       if (xhr.status !== 200) {
          //         // 抛出 'on-upload-fail' 钩子
          //         _this.$emit('on-upload-fail')
          //         failure('上传失败: ' + xhr.status)
          //         return
          //       }
          //       const json = JSON.parse(xhr.responseText)
          //       // 抛出 'on-upload-success' 钩子
          //       _this.$emit('on-upload-success', [
          //         json, success, failure
          //       ])
          //     }
          //     xhr.onerror = function() {
          //       _this.$emit('on-ready', '上传失败')
          //     }
          //     formData.append('file', blobInfo.blob())
          //     xhr.send(formData)
          //   }
          // },


          images_upload_handler: function (blobInfo, success, failure) {
            if (blobInfo.blob().size > self.maxSize) {
              failure('文件体积过大')
            }
            if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
              uploadPic()
            } else {
              failure('图片格式错误')
            }
            function uploadPic () {
              let formData = new FormData()
              console.log(_this.imgurl)
              // 服务端接收文件的参数名，文件数据，文件名
              formData.append('upfile', blobInfo.blob(), blobInfo.filename())
              _this.$axios({
                method: 'POST',
                // 这里是你的上传地址
                url: _this.imgurl,
                data: formData,
              })
                .then((res) => {
                  // 这里返回的是你图片的地址
                  console.log('success')
                  success(res.data.url)
                })
                .catch(() => {
                  failure('上传失败')
                })
            }
          },
          file_picker_callback: function(callback, value, meta) {
            // Provide file and text for the link dialog
            if (meta.filetype == 'file') {
              callback('mypage.html', {text: 'My 1text'});
            }

            // Provide image and alt text for the image dialog
            if (meta.filetype == 'image') {
              callback('myimage.jpg', {alt: 'My alt text'});
            }

            // Provide alternative source and posted for the media dialog
            if (meta.filetype == 'media') {
              callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
            }
          }
        }
      Object.assign(setting, _this.setting)

      tinymce.init(setting)
    },
    beforeDestroy: function() {
      tinymce.get(this.id).destroy()
    }
  }
</script>


<!--<template>-->
  <!--<div class='tinymce-container editor-container'>-->
    <!--<textarea class='tinymce-textarea' :id="id"></textarea>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--export default {-->
    <!--name: 'tinymce',-->
    <!--props: {-->
      <!--id: {-->
        <!--type: String,-->
        <!--default: 'tinymceEditor'-->
      <!--},-->
      <!--value: {-->
        <!--type: String,-->
        <!--default: ''-->
      <!--},-->
      <!--toolbar: {-->
        <!--type: Array,-->
        <!--required: false,-->
        <!--default() {-->
          <!--return [-->
            <!--'undo redo | bold italic underline strikethrough removeformat | forecolor backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | separator link joinfimage'-->
          <!--]-->
        <!--}-->
      <!--},-->
      <!--data() {-->
        <!--return {-->
          <!--hasChange: false,-->
          <!--hasInit: false-->
        <!--}-->
      <!--},-->
      <!--menubar: {-->
        <!--default: ''-->
      <!--},-->
      <!--height: {-->
        <!--type: Number,-->
        <!--required: false,-->
        <!--default: 360-->
      <!--}-->
    <!--},-->
    <!--watch: {-->
      <!--value(val) {-->
        <!--if (!this.hasChange && this.hasInit) {-->
          <!--this.$nextTick(() => tinymce.get(this.id).setContent(val))-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--const _this = this;-->
      <!--tinymce.init({-->
        <!--selector: `#${this.id}`,-->
        <!--language: 'zh_CN',-->
        <!--height: this.height,-->
        <!--body_class: 'panel-body',-->
        <!--object_resizing: true,-->
        <!--toolbar: this.toolbar,-->
        <!--menubar: false,-->
        <!--statusbar: false,-->
        <!--font_formats:"微软雅黑=微软雅黑,Microsoft YaHei;宋体=宋体,SimSun;黑体=黑体, SimHei;隶书=隶书, SimLi;楷体=楷体,楷体_GB2312, SimKai;andale mono=andale mono;arial=arial, helvetica,sans-serif;arial black=arial black,avant garde;comic sans ms=comic sans ms;impact=impact,chicago;Arial=Arial;Verdana=Verdana;Georgia=Georgia;Times New Roman=Times New Roman;Trebuchet MS=Trebuchet MS;Courier New=Courier New;Impact=Impact;Comic Sans MS=Comic Sans MS;Calibri=Calibri",-->
        <!--images_upload_url: this.html_url+'/common/uploadFile',-->
        <!--imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],-->
        <!--plugins: [-->
          <!--'advlist autolink lists link image preview anchor'-->
          <!--,'searchreplace visualblocks code fullscreen'-->
          <!--,'charmap colorpicker directionality emoticons nonbreaking'-->
          <!--,'tabfocus textcolor joinfimage'-->
        <!--],-->
        <!--fontsizeFormats: '8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt',-->
        <!--default_link_target: '_blank',-->
        <!--link_title: false,-->
        <!--init_instance_callback: editor => {-->
          <!--if (_this.value) {-->
            <!--editor.setContent(_this.value)-->
          <!--}-->
          <!--_this.hasInit = true;-->
          <!--editor.on('NodeChange Change KeyUp', () => {-->
            <!--this.hasChange = true;-->
            <!--this.$emit('input', editor.getContent({ format: 'raw' }));-->
          <!--});-->
        <!--},-->
        <!--setup(editor) {-->
          <!--editor.addButton('h2', {-->
            <!--title: '小标题', // tooltip text seen on mouseover-->
            <!--text: '小标题',-->
            <!--onclick() {-->
              <!--editor.execCommand('mceToggleFormat', false, 'h2');-->
            <!--},-->
            <!--onPostRender() {-->
              <!--const btn = this;-->
              <!--editor.on('init', () => {-->
                <!--editor.formatter.formatChanged('h2', state => {-->
                  <!--btn.active(state);-->
                <!--});-->
              <!--});-->
            <!--}-->
          <!--});-->
          <!--editor.addButton('p', {-->
            <!--title: '正文',-->
            <!--text: '正文',-->
            <!--onclick() {-->
              <!--editor.execCommand('mceToggleFormat', false, 'p');-->
            <!--},-->
            <!--onPostRender() {-->
              <!--const btn = this;-->
              <!--editor.on('init', () => {-->
                <!--editor.formatter.formatChanged('p', state => {-->
                  <!--btn.active(state);-->
                <!--});-->
              <!--});-->
            <!--}-->
          <!--});-->
          <!--editor.on('joinimageuploadstart',function(e){-->
            <!--_this.$message({duration:0,message:"正在上传图片..."});-->
          <!--});-->
          <!--editor.on('joinimageuploadend',function(e){-->
            <!--_this.$message.closeAll();-->
          <!--});-->
          <!--editor.on('joinimageuploaderror',function(e){-->
            <!--_this.$message({duration:0,message:e.errMsg});-->
            <!--setTimeout(function(){-->
              <!--_this.$message.closeAll();-->
            <!--},3000);-->
          <!--});-->
        <!--}-->
      <!--});-->
    <!--},-->
    <!--destroyed() {-->
      <!--tinymce.get(this.id).destroy();-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style scoped>-->
  <!--.tinymce-container {position: relative}-->
  <!--.tinymce-textarea {visibility: hidden;z-index: -1;}-->
  <!--.editor-custom-btn-container {position: absolute;right: 15px;top: 18px;}-->
  <!--.editor-upload-btn {display: inline-block;}-->
<!--</style>-->

<!--<template>-->
  <!--<editor id='tinymce' :init='init'></editor>-->
<!--</template>-->

<!--<script>-->
  <!--// import Editor from '@tinymce/tinymce-vue';-->
  <!--// import tinymce from '../../static/tinymce/tinymce.min.js';-->
  <!--// import '../../static/tinymce/themes/modern/theme';-->
  <!--// import '../../static/tinymce/plugins/image/plugin';-->
  <!--// import '../../static/tinymce/plugins/imagetools/plugin';-->
  <!--import $ from 'jquery';-->
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
    <!--components: {-->
      <!--Editor-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
        <!--editor: null,-->
        <!--init: {-->
          <!--language_url: '/static/tinymce/langs/zh_CN.js',-->
          <!--language: 'zh_CN',-->
          <!--skin_url: '/static/tinymce/skins/lightgray',-->
          <!--height: 100,-->
          <!--plugins: "image imagetools",-->
          <!--image_caption: true,-->
          <!--image_advtab: true,-->
          <!--// content_css: [-->
          <!--// '/alitech/static/css/github-markdown.css',],-->
          <!--// menubar: "insert",-->
          <!--// image_list:[],-->
          <!--// plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',-->
          <!--// toolbar:-->
          <!--// 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',-->
          <!--branding: false,-->
          <!--file_browser_callback: function (field_name, url, type, win) {-->

            <!--console.log(field_name);-->
            <!--if (type == 'media') return false;-->
            <!--var accept = {-->
              <!--image: 'image/png, image/gif, image/jpg, image/jpeg',-->
              <!--media: 'audio/mpeg, audio/wav, video/mp4, video/webm, video/ogg'-->
            <!--};-->

            <!--var eleFile = $('<input type="file" accept="' + accept[type] + '">');-->
            <!--eleFile.click();-->

            <!--eleFile.on('change', function () {-->
              <!--var file = this.files[0];-->
              <!--var name = file.name || 'screenshot.png';-->
              <!--var data = new FormData();-->
              <!--data.append('file', file, name);-->

              <!--$.ajax('/oss/upload.json', {-->
                <!--data: data,-->
                <!--type: 'POST',-->
                <!--processData: false,-->
                <!--contentType: false-->
              <!--}).done(function (res) {-->
                <!--if (res.code == 200) {-->
                  <!--$('#' + field_name).val(res.data.url);-->
                <!--} else {-->
                  <!--alert(res.message);-->
                <!--}-->
              <!--}).fail(function (xhr) {-->
                <!--if (xhr.responseText) {-->
                  <!--alert(xhr.responseText);-->
                <!--}-->
              <!--});-->
            <!--});-->
          <!--}-->
        <!--},-->
      <!--};-->
    <!--},-->
    <!--methods: {-->
    <!--},-->
    <!--mounted() {-->

    <!--},-->
    <!--created() {-->
    <!--}-->
  <!--};-->

<!--</script>-->

<!--<style scoped>-->
  <!--#tinymce {-->
    <!--position: relative;-->
    <!--z-index: 0;-->
    <!--margin-bottom: 50px;-->
  <!--}-->
  <!--.w-e-text-container{-->
    <!--height: 500px!important;-->
    <!--resize: vertical;-->
  <!--}-->

<!--</style>-->
