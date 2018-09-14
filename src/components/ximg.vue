<template>
<div>
  <div class="note" :style ="note">xx</div>
</div>
</template>

<script>
    export default {
        name: "ximg",
        data(){
            return{
              note: {
                backgroundImage: "url(" + require("../assets/desktop.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "250px auto",
                marginTop: "5px",
              },
            }
        }
    }
</script>

<style scoped>
  .note {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #1DA7DA;
  }
</style>
