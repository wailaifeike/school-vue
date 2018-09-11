<template>
    <div class="block">
         <el-carousel indicator-position="outside" height="600px">
          <el-carousel-item v-for="item in imglist" :key="item.id">
            <img :src="item.src" alt="">
          </el-carousel-item>
        </el-carousel>
  </div>
</template>

<script>
    export default {
        name: "lubo",
        data(){
          return{
            imglist:[
          {id:1,src:"../../static/imgs/schho2.jpg"},
          {id:2,src:"../../static/imgs/school.jpg"},
          {id:3,src:"../../static/imgs/school3.jpg"},
          {id:4,src:"../../static/imgs/school4.jpg"}
        ]
          }
        }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
