<template>
   <div >
     <div class="note" :style ="note"></div>
       <div class="form" >
         <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

      <el-row>
        <el-col :span="8" :offset="8">
          <el-form-item label="用户名" prop="checkname">
            <el-input type="text" v-model="ruleForm2.checkname" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" :offset="8">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8" :offset="8">
          <el-form-item>

            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      </div>

   </div>
</template>

<script>

    export default {
        name: "login",
        data(){
            var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('输入用户名'));
          }else {
            // if (this.ruleForm2.checkname !== '') {
            //   this.$refs.ruleForm2.validateField('checkname');
            // }
            callback();

        }};

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {

        note: {
          backgroundImage: "url(" + require("../assets/desktop.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "25px auto",
          marginTop: "5px",
        },
        ruleForm2: {
          pass: '',
          checkPass: '',
          checkname:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkname: [
            { validator: validatePass3, trigger: 'blur' }
          ],
        }
      };
        },
      methods:{
          submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that =this;
            this.$axios.request({
              url: "http://127.0.0.1:8010/login/",
              method: "POST",
              data: {
                user: this.ruleForm2.checkname,
                pwd: this.ruleForm2.pass
              },
              headers: {
                'Content-Type': 'application/json',
              }
      }).then(function (args) {
            if (args.data.code === 1000) {

              that.$message('登入成功！');
              that.$store.commit('saveToken',{token:args.data.token,username:that.ruleForm2.checkname});
              console.log(args.data.token)
              var url = that.$route.query.backUrl
              if (url) {
                that.$router.push({path: url})
              } else {
                that.$router.push({path: '/'})
                // location.reload()

              }
            } else {
              console.log(args.data.error)
            }
          }).catch(function (args) {

          })

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      mounted(){

      },
      components:{

      }
    }
</script>

<style scoped>

</style>
