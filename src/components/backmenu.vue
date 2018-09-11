<template>
<div>
  <div class="pg-header">
    <div class="logo " style="text-align: center;background-color: #1c5a9c; float: left">
        <a href="#" style="color: #ffffff;font-size:30px;text-decoration: none">
            信息发布系统
        </a>
    </div>

    <div class="left-menu" style="float: left">
        <a class="menu-item" href="/">首页</a>
       <!--<a class="menu-item" href=""></a>-->
    </div>

    <div class="right-menu clearfix" style="float: right">

        <div class="user-info right">
            <a href="#" class="avatar">
                <img class="img-circle" src="../../static/avtar/default.png">
            </a>

            <div class="more-info">
                <a href="" class="more-item">个人信息</a>
                <a href="" class="more-item" @click="Logout">注销</a>
            </div>
        </div>

        <a class="user-menu " style="float:right;">
            <!--欢迎&nbsp &nbsp{{ request.user.username }}-->
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
            <span class="badge bg-success">2</span>
        </a>

        <a class="user-menu"  style="float:right;">
            消息
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
            <span class="badge bg-success">2</span>
        </a>

        <a class="user-menu"  style="float:right;">
            通知
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
            <span class="badge bg-success">2</span>
        </a>

        <a class="user-menu"  style="float:right;">
            任务
            <i class="fa fa-bell-o" aria-hidden="true"></i>
            <span class="badge bg-danger">5</span>
        </a>
    </div>

  </div>
   <div class="pg-body">


    <div class="menu">
        <a class="menu-item" href="">
            <i class="fa fa-cogs" aria-hidden="true"></i>
            <span>文件管理</span>
        </a>
       <a class="menu-item" href="/backend/category.html">
            <i class="fa fa-cogs" aria-hidden="true"></i>
            <span>公告管理</span>
        </a>
        <a class="menu-item" href="/backend/tag.html">
            <i class="fa fa-cogs" aria-hidden="true"></i>
            <span>资料管理</span>
        </a>
        <a class="menu-item" href="/backend/base-info.html">
            <i class="fa fa-cogs" aria-hidden="true"></i>
            <span>个人信息</span>
        </a>

      <a class="menu-item" href="/backend/category.html">
        <i class="fa fa-cogs" aria-hidden="true"></i>
        <span>表格展示</span>
      </a>


    </div>



     <div>
       <!--<test></test>-->
       <tablelist></tablelist>
     </div>
   </div>

</div>
</template>

<script>
  // $(function () {
  //   alert(123);
  // });
  import test from './test'
  import tablelist from './tablelist'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      Logout(){
        this.$store.commit('clearToken');
        this.$router.push({path : '/'});
      }
    },
    components:{
      test,
      tablelist
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style slot-scope="scope">
  .pg-header {
    min-width: 1190px;
    height: 48px;
    background-color: #2F72AB;
    line-height: 48px;
    overflow: visible;
    font-size: 12px;
}
.pg-header a{
    color: #ffffff;
    text-decoration: none;
}
.pg-header .logo {
    width: 200px;
    overflow: hidden;
    height: 48px;
}

.pg-header .logo img {
    width: 200px;
    height: 40px;
    margin-top: 4px;

}
.pg-header .left-menu{
    font-size: 13px;
}
.pg-header .left-menu .menu-item{
    display: inline-block;
    padding: 0 15px;
    cursor: pointer;
    position: relative;
}
.pg-header .left-menu .menu-item:hover {
    background-color: #337ab7;

}
.pg-header .left-menu .menu-item .more-info {
    display: none;
    position: absolute;
    top: 48px;
    left: 0;
    border: 1px solid rgba(0, 0, 0, .15);
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    background-color: #fff;
    color: #333;
}
.pg-header .left-menu .menu-item:hover .more-info {
    display: block;
}
.pg-header .left-menu .menu-item .more-info .more-item {
    display: block;
    min-width: 120px;
    padding: 0 15px;
    line-height: 35px;
    text-decoration: none;
    color: #000000;

}
.pg-header .left-menu .menu-item .more-info .more-item:hover{
    background-color: #f1f0f0;
}

.pg-header .right-menu .user-menu {
    padding: 0 8px;
    cursor: pointer;
    color: #ffffff;
}
.pg-header .right-menu .user-menu .bg-success{
    background-color: #5cb85c !important;
    color: #ffffff;
}
.pg-header .right-menu .user-menu .bg-danger{
    background-color: #d9534f !important;
    color: #ffffff;
}

.pg-header .right-menu .user-menu:hover {
    background-color: #337ab7;

}

.pg-header .right-menu .user-info {
    padding: 0 30px 0 10px;
    height: 48px;
    position: relative;
}

.pg-header .right-menu .user-info:hover .avatar {
    background-color: #337ab7;
}

.pg-header .right-menu .user-info .avatar {
    display: inline-block;
    padding: 0 10px;
    height: 48px;
}


.pg-header .right-menu .user-info .more-info {
    display: none;
    position: absolute;
    top: 48px;
    right: 20px;
    border: 1px solid rgba(0, 0, 0, .15);
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    background-color: #fff;
    color: #333;
    z-index: 100;
}

.pg-header .right-menu .user-info:hover .more-info {
    display: block;
}
.pg-header .right-menu .user-info .more-info .more-item {
    display: block;
    min-width: 160px;
    padding: 0 15px;
    line-height: 35px;
    text-decoration: none;
    color: #000000;

}
.pg-header .right-menu .user-info .more-info .more-item:hover{
    background-color: #f1f0f0;
}


.pg-body{
    position: absolute;
    z-index: 90;
    top:50px;
    bottom: 0;
    right: 0;
    left: 0;
    min-width: 1190px;
}
.pg-body .menu{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    border: 1px solid #dddddd;
}
.pg-body .menu .menu-item{
    display: block;
    padding: 8px 8px;
    border-bottom: 1px dashed #dddddd;
    text-decoration: none;
}

.pg-body .content {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 205px;
  border: 1px solid #dddddd;
  overflow: scroll;
}
  .left{
   float:left
 }
  .right{
    float: right;
  }
</style>
