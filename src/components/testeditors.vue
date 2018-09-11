<template lang="html">
  <div>
    <editor-bar v-model="editor.info" :isClear="isClear"></editor-bar>
  </div>
</template>

<script>

  import EditorBar from '@/components/EditorBar'
  export default {
    data () {
      return {
        editor: {
          info: ''
        },
        isClear: false
      }
    },
    components: {
      EditorBar
    }
  }
</script>

