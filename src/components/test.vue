<template>

<div class="content">
  <ol class="breadcrumb" style="margin-bottom: 0;">
    <li><a href="#">报障管理</a></li>&nbsp/&nbsp
    <li class="active">报障列表</li>
  </ol>
  <div class="clearfix"
       style="height: 36px;line-height: 35px;padding: 0 15px;border-top: 1px solid #dddddd;background-color: #f1f0f0">
    <i class="fa fa-table" aria-hidden="true"></i>
    报障单

    <a target="_blank" href="/back/add-trouble.html" class="right"
       style="display: inline-block;padding:0 10px;background-color: #428bca;color: #ffffff;">
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
      创建新报障单
    </a>
  </div>
  <div class="sel">
    <el-row>
     <div class="opleft">
       <el-col :span="5" > <el-select v-model="value4" clearable placeholder="请选择">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
         <el-button icon="el-icon-search" circle size=""></el-button>
       </el-col >

     </div>
      <div class="opright">
        <el-col :span="4"  :offset="13"><el-input  placeholder="请输入内容" v-model="input5" > </el-input></el-col>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="tableData"  ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
    <div class="block pull-right">
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="200"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>

  </div>

  </div>
</template>

<script>
    export default {
        name: "test",
        data(){
          return{
            input5:"",
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 7,
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            value4: '',
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }]
          }
        },
      methods:{
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>

<style scoped>
   li a{
     text-decoration: none;
   }
   .content{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 205px;
    border: 1px solid #dddddd;
    overflow: scroll;
  }
   .right{
     float: right;
   }
   .left{
     float: left;
   }
  .sel{
    margin-top: 10px;
    margin-left: 10px;
  }
  /*.opright{*/
    /*float: right;*/
  /*}*/


</style>
