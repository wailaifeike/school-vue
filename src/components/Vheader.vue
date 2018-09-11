<template>
  <div>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-col :span="2"><el-menu-item index="0"><img src="../../static/imgs/logo.jpg" alt=""></el-menu-item></el-col>
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">

       <el-col :span="2"><el-menu-item index="1">学校首页</el-menu-item></el-col>
       <el-col :span="2"><el-menu-item index="1-1">最新公告</el-menu-item></el-col>

        <el-col :span="2">
              <el-submenu index="2">
                  <template slot="title">文件管理</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu>
      </el-col>

      <el-col :span="2">
              <el-submenu index="2-4">
            <template slot="title">资料下载</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-col>

          <el-col :span="2"><el-menu-item index="3">消息中心</el-menu-item></el-col>
          <el-col :span="2"><el-menu-item index="3-1">后台管理</el-menu-item></el-col>
          <el-col :span="2" :push="4">
             <el-menu-item index="3-2"  v-if="token"><router-link to="/manage">
               {{this.$store.state.username}}</router-link></el-menu-item>
            <router-link to="/login"  v-else><el-menu-item index="3-2">登入/注册</el-menu-item> </router-link>
          </el-col>

          </el-row>
    </el-menu>

  </div>

</template>

<script>


  export default {
    name: "Vheader",
   data() {
      return {
        activeIndex2: '1',
        token:this.$store.state.token,
        name:this.$store.state.username
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {}
  }

</script>

<style scoped>
  img{
    height: 48px;
    width:300px;
  }
</style>
