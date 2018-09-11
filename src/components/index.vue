<template>

  <div>
    <Vheader></Vheader>
    <div class="lubo">
      <lubo></lubo>
    </div>

    <div class="content">
      <Vbody></Vbody>
      <Vbody></Vbody>
      <Vbody></Vbody>
      <Vbody></Vbody>
    </div>

  </div>
</template>

<script>
  import Vheader from './Vheader'
  import lubo from './lubo'
  import Vbody from './Vbody'
    export default {
        name: "index",
        components:{
          Vheader,
          lubo,
          Vbody

        }

    }
</script>

<style scoped>

</style>
