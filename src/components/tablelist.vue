<template>
<div class="content">

  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="公告查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="userfilter">查询</el-button>
        </el-form-item>
        <el-form-item>
          <!--<el-button type="text" @click="dialogFormVisible = true">新增</el-button>-->
          <el-button type="primary" @click="">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="notices" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column type="index" width="60" label="ID">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="280" sortable>
      </el-table-column>
      <!--<el-table-column prop="content" label="内容" width="180" :formatter="formatSex" sortable>-->
      <!--</el-table-column>-->
      <el-table-column prop="ctime" label="创建时间" width="200" sortable>
      </el-table-column>
      <el-table-column prop="username" label="创建人" width="200" sortable>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="200" sortable>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
          <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <el-button size="small" @click="dialogFormVisible = true,handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">-->
      <!--</el-pagination>-->
    </el-col>

    <!--编辑界面-->
    <!--<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">-->
      <!--<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">-->
        <!--<el-form-item label="姓名" prop="name">-->
          <!--<el-input v-model="editForm.name" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="性别">-->
          <!--<el-radio-group v-model="editForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="年龄">-->
          <!--<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="生日">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="地址">-->
          <!--<el-input type="textarea" v-model="editForm.addr"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click.native="editFormVisible = false">取消</el-button>-->
        <!--<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->





    <el-dialog title="编辑公告" :visible.sync="dialogFormVisible">
      <el-form :model="editform">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="editform.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea">

        </el-input> </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="editform.choice" placeholder="请编辑公告状态">
            <el-option label="未审核" value="1" ></el-option>
            <el-option label="审核中" value="2"></el-option>
            <el-option label="已审核" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>


  </section>

</div>

</template>

<script>
  // import util from '../common/js/util'
  // //import NProgress from 'nprogress'
  // import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../api/api';

  export default {
    data() {
      return {
       filters: {
       name: ''
       },
        notices: [],
        total: 0,
        page: 1,
        editId:"",
      listLoading: false,
        sels: [],//列表选中列
        dialogFormVisible:false,
        // dialogFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },

        formLabelWidth: '120px',
        textarea:'',

        editform: {
          name: '',
          choice: '',
          // date1: '',
          // date2: '',
          // delivery: false,
          // type: [],
          // resource: '',
          desc: ''
        },

        //编辑界面数据
        // editForm: {
        //   id: 0,
        //   name: '',
        //   sex: -1,
        //   age: 0,
        //   birth: '',
        //   addr: ''
        // },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        }

      }
    },
    methods: {


      //获取用户列表
      getUsers() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        this.listLoading = true;
        this.initNotice()
        this.listLoading = false;
        //NProgress.start();
        // getUserListPage(para).then((res) => {
        //   this.total = res.data.total;
        //   this.users = res.data.users;
        //   this.listLoading = false;
        //   //NProgress.done();
        // });
      },

      //初始化公告
      initNotice(){
       var that = this;
       this.$axios.request({
         url:"http://127.0.0.1:8010/notices/",
         method:"GET"
       }).then(function (arg) {
            // console.log(arg.data.data)
         if(arg.data.code=="1000"){
           // console.log("xxxx")
           // console.log(arg.data.data)
           that.notices = arg.data.data;

         }else{
           alert(arg.data.errors)
         }
       }).catch(function (arg) {

       })
      },
      //删除
      userfilter(){
        console.log('select')
      },
      //编辑
      handleEdit(index,row){
        this.editform.name = row.title
        this.textarea = row.content
        this.editform.choice = row.status
        this.editId = row.id

      },

      cancelEdit(){
        this.dialogFormVisible = false
        console.log('cancel')
      },
      confirmEdit(){
        this.dialogFormVisible = false
        // console.log(this.editform.choice)
        // console.log(this.textarea)
        var edit_obj = this.notices[parseInt(this.editId)-1]
        if (this.editform.choice =="3"){
          edit_obj.status = "已审核"
        }
        else if (this.editform.choice =="2"){
          edit_obj.status = "审核中"
        } else if(this.editform.choice =="1")
        {
          edit_obj.status = "未审核"
        }
          edit_obj.content = this.textarea
          edit_obj.title = this.editform.name

        var that = this;
        //console.log(that.editform.choice,that.textarea,that.editform.name)
        this.$axios.request({
          url:"http://127.0.0.1:8010/notices/",
          method:"POST",
          data:{
            id:parseInt(this.editId),
            status:that.editform.choice,
            content:that.textarea,
            title:that.editform.name
          }
        }).then(function (arg) {
          // console.log(arg.data.data)
          if(arg.data.code=="1000"){
            // console.log("xxxx")
            // console.log(arg.data.data)
            console.log("ok")

          }else{
            alert(arg.data.errors)
          }
        }).catch(function (arg) {

        })


      },



      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getUsers();
    }
  }

</script>

<style scoped>

</style>
