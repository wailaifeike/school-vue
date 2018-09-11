<!--<template>-->
  <!--<div class="content">-->

    <!--<section>-->
      <!--&lt;!&ndash;工具条&ndash;&gt;-->
      <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
        <!--<el-form :inline="true" :model="filters">-->
          <!--<el-form-item>-->
            <!--<el-input v-model="filters.name" placeholder="公告查询"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" v-on:click="getUsers">查询</el-button>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--&lt;!&ndash;<el-button type="text" @click="dialogFormVisible = true">新增</el-button>&ndash;&gt;-->
            <!--<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-col>-->

      <!--&lt;!&ndash;列表&ndash;&gt;-->
      <!--<el-table :data="notices" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">-->
        <!--<el-table-column type="selection" width="55">-->
        <!--</el-table-column>-->

        <!--<el-table-column type="index" width="60" label="ID">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="title" label="标题" width="280" sortable>-->
        <!--</el-table-column>-->
        <!--&lt;!&ndash;<el-table-column prop="content" label="内容" width="180" :formatter="formatSex" sortable>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--<el-table-column prop="ctime" label="创建时间" width="200" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="username" label="创建人" width="200" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="status" label="状态" min-width="200" sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作" width="180">-->
          <!--<template slot-scope="scope">-->
            <!--&lt;!&ndash;<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>&ndash;&gt;-->
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->

      <!--&lt;!&ndash;工具条&ndash;&gt;-->
      <!--<el-col :span="24" class="toolbar">-->
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
        <!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">-->
        <!--</el-pagination>-->
      <!--</el-col>-->

      <!--&lt;!&ndash;编辑界面&ndash;&gt;-->
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

      <!--&lt;!&ndash;新增界面&ndash;&gt;-->

      <!--&lt;!&ndash;<el-dialog title="新增" :visible.sync="dialogFormVisible">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="姓名" prop="name">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-input v-model="addForm.name" auto-complete="off"></el-input>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="性别">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-radio-group v-model="addForm.sex">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-radio class="radio" :label="1">男</el-radio>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-radio class="radio" :label="0">女</el-radio>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-radio-group>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="年龄">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="生日">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="地址">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-input type="textarea" v-model="addForm.addr"></el-input>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
      <!--&lt;!&ndash;<div slot="footer" class="dialog-footer">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button @click="dialogFormVisible = false">取消</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button type="primary" @click.native="addSubmit" :loading="addLoading" @click="dialogFormVisible = false">提交</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-dialog>&ndash;&gt;-->

    <!--</section>-->

  <!--</div>-->

<!--</template>-->

<!--<script>-->
  <!--// import util from '../common/js/util'-->
  <!--// //import NProgress from 'nprogress'-->
  <!--// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../api/api';-->

  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--filters: {-->
          <!--name: ''-->
        <!--},-->
        <!--notices: [],-->
        <!--total: 0,-->
        <!--page: 1,-->
        <!--listLoading: false,-->
        <!--sels: [],//列表选中列-->
        <!--dialogFormVisible:false,-->
        <!--editFormVisible: false,//编辑界面是否显示-->
        <!--editLoading: false,-->
        <!--editFormRules: {-->
          <!--name: [-->
            <!--{ required: true, message: '请输入姓名', trigger: 'blur' }-->
          <!--]-->
        <!--},-->
        <!--//编辑界面数据-->
        <!--editForm: {-->
          <!--id: 0,-->
          <!--name: '',-->
          <!--sex: -1,-->
          <!--age: 0,-->
          <!--birth: '',-->
          <!--addr: ''-->
        <!--},-->

        <!--addFormVisible: false,//新增界面是否显示-->
        <!--addLoading: false,-->
        <!--addFormRules: {-->
          <!--name: [-->
            <!--{ required: true, message: '请输入姓名', trigger: 'blur' }-->
          <!--]-->
        <!--},-->
        <!--//新增界面数据-->
        <!--addForm: {-->
          <!--name: '',-->
          <!--sex: -1,-->
          <!--age: 0,-->
          <!--birth: '',-->
          <!--addr: ''-->
        <!--}-->

      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--//性别显示转换-->
      <!--formatSex: function (row, column) {-->
        <!--return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';-->
      <!--},-->
      <!--handleCurrentChange(val) {-->
        <!--this.page = val;-->
        <!--this.getUsers();-->
      <!--},-->
      <!--//获取用户列表-->
      <!--getUsers() {-->
        <!--let para = {-->
          <!--page: this.page,-->
          <!--name: this.filters.name-->
        <!--};-->
        <!--this.listLoading = true;-->
        <!--this.initNotice()-->
        <!--this.listLoading = false;-->
        <!--//NProgress.start();-->
        <!--// getUserListPage(para).then((res) => {-->
        <!--//   this.total = res.data.total;-->
        <!--//   this.users = res.data.users;-->
        <!--//   this.listLoading = false;-->
        <!--//   //NProgress.done();-->
        <!--// });-->
      <!--},-->

      <!--//初始化公告-->
      <!--initNotice(){-->
        <!--var that = this;-->
        <!--this.$axios.request({-->
          <!--url:"http://127.0.0.1:8010/notices/",-->
          <!--method:"GET"-->
        <!--}).then(function (arg) {-->
          <!--// console.log(arg.data.data)-->
          <!--if(arg.data.code=="1000"){-->
            <!--console.log("xxxx")-->
            <!--console.log(arg.data.data)-->
            <!--that.notices = arg.data.data;-->

          <!--}else{-->
            <!--alert(arg.data.errors)-->
          <!--}-->
        <!--}).catch(function (arg) {-->

        <!--})-->
      <!--},-->
      <!--//删除-->
      <!--handleDel: function (index, row) {-->
        <!--this.$confirm('确认删除该记录吗?', '提示', {-->
          <!--type: 'warning'-->
        <!--}).then(() => {-->
          <!--this.listLoading = true;-->
          <!--//NProgress.start();-->
          <!--let para = { id: row.id };-->
          <!--removeUser(para).then((res) => {-->
            <!--this.listLoading = false;-->
            <!--//NProgress.done();-->
            <!--this.$message({-->
              <!--message: '删除成功',-->
              <!--type: 'success'-->
            <!--});-->
            <!--this.getUsers();-->
          <!--});-->
        <!--}).catch(() => {-->

        <!--});-->
      <!--},-->
      <!--//显示编辑界面-->
      <!--handleEdit: function (index, row) {-->
        <!--this.editFormVisible = true;-->
        <!--this.editForm = Object.assign({}, row);-->
        <!--console.log('编辑')-->
        <!--console.log(index+1,row)-->
      <!--},-->
      <!--//显示新增界面-->
      <!--handleAdd: function () {-->
        <!--console.log('新增')-->
        <!--// this.addFormVisible = true;-->
        <!--this.addForm = {-->
          <!--name: '',-->
          <!--sex: -1,-->
          <!--age: 0,-->
          <!--birth: '',-->
          <!--addr: ''-->
        <!--};-->
        <!--console.log(this.addFormVisible)-->
      <!--},-->
      <!--//编辑-->
      <!--editSubmit: function () {-->

        <!--this.$refs.editForm.validate((valid) => {-->
          <!--if (valid) {-->
            <!--this.$confirm('确认提交吗？', '提示', {}).then(() => {-->
              <!--this.editLoading = true;-->
              <!--//NProgress.start();-->
              <!--let para = Object.assign({}, this.editForm);-->
              <!--para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');-->
              <!--editUser(para).then((res) => {-->
                <!--this.editLoading = false;-->
                <!--//NProgress.done();-->
                <!--this.$message({-->
                  <!--message: '提交成功',-->
                  <!--type: 'success'-->
                <!--});-->
                <!--this.$refs['editForm'].resetFields();-->
                <!--this.editFormVisible = false;-->
                <!--this.getUsers();-->
              <!--});-->
            <!--});-->
          <!--}-->
        <!--});-->
      <!--},-->
      <!--//新增-->
      <!--addSubmit: function () {-->
        <!--console.log('xxx')-->
        <!--this.dialogFormVisible=false-->
        <!--// this.$refs.addForm.validate((valid) => {-->
        <!--//   if (valid) {-->
        <!--//     this.$confirm('确认提交吗？', '提示', {}).then(() => {-->
        <!--//       this.addLoading = true;-->
        <!--//       //NProgress.start();-->
        <!--//       let para = Object.assign({}, this.addForm);-->
        <!--//       para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');-->
        <!--//       addUser(para).then((res) => {-->
        <!--//         this.addLoading = false;-->
        <!--//         //NProgress.done();-->
        <!--//         this.$message({-->
        <!--//           message: '提交成功',-->
        <!--//           type: 'success'-->
        <!--//         });-->
        <!--//         this.$refs['addForm'].resetFields();-->
        <!--//         this.addFormVisible = false;-->
        <!--//         this.getUsers();-->
        <!--//       });-->
        <!--//     });-->
        <!--//   }-->
        <!--// });-->
      <!--},-->
      <!--selsChange: function (sels) {-->
        <!--this.sels = sels;-->
      <!--},-->
      <!--//批量删除-->
      <!--batchRemove: function () {-->
        <!--var ids = this.sels.map(item => item.id).toString();-->
        <!--this.$confirm('确认删除选中记录吗？', '提示', {-->
          <!--type: 'warning'-->
        <!--}).then(() => {-->
          <!--this.listLoading = true;-->
          <!--//NProgress.start();-->
          <!--let para = { ids: ids };-->
          <!--batchRemoveUser(para).then((res) => {-->
            <!--this.listLoading = false;-->
            <!--//NProgress.done();-->
            <!--this.$message({-->
              <!--message: '删除成功',-->
              <!--type: 'success'-->
            <!--});-->
            <!--this.getUsers();-->
          <!--});-->
        <!--}).catch(() => {-->

        <!--});-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--this.getUsers();-->
    <!--}-->
  <!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
