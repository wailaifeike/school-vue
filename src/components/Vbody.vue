<template>
  <div>
      <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>最新消息</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
      </el-card>
  </div>
</template>

<script>
    export default {
        name: "Vbody"
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
    margin-top: 10px;
    margin-left: 40px;
    padding: 10px 10px;
    float: left;
  }
</style>
