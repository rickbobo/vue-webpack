<template>
  <div class="login-container">
    <div class="login-container-title">
      发票管理平台
    </div>
    <el-form autoComplete="on" :model="loginForm" :rules="rules" ref="loginForm" label-position="left"
             class="login-form">
      <h3 class="title">登录</h3>
      <el-form-item prop="userName">
        <el-input placeholder="请输入用户名" v-model.trim="loginForm.userName" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" type="password" v-model.trim="loginForm.password" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item prop="code" class="yzm">
        <el-input placeholder="请输入验证码" v-model.trim="loginForm.code"
                  @keyup.enter.native="handleLogin('loginForm')"></el-input>
        <div class="identifyingCode">
          <canvas id="canvas" width="96" height="36" @click.prevent="getVerificationCode"></canvas>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin('loginForm')" class="btn">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {Base64} from 'js-base64';
  import {LOGIN} from '@/store/user';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';
  import validate from '@/assets/js/validate';

  export default {
    data() {
      const validatorUserName = (rule, value, callback) => {
        if (validate.validateUserName(value)) {
          callback();
        } else {
          callback(new Error('用户名格式不对'));
        }
      };
      const validatorPassword = (rule, value, callback) => {
        if (validate.validatePassword(value)) {
          callback();
        } else {
          callback(new Error('密码格式不对'));
        }
      };
      const validatorCode = (rule, value, callback) => {
        if (value.toLowerCase() === this.verificationCode) {
          callback();
        } else {
          callback(new Error('验证码输入错误'));
        }
      };
      return {
        loading: false,
        verificationCode: '',
        loginForm: {
          userName: '',
          password: '',
          code: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: validatorUserName, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatorPassword, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {validator: validatorCode, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      ...mapActions([LOGIN]),
      handleLogin(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            this.LOGIN(this.loginForm).then(() => {
              this.loading = false;
              this.$router.push('/index');
            }).catch(({code, msg}) => {
              this.loading = false;
              if (code === '300') {
                this.$router.push('/firstUpdatePassword');
              } else {
                this.getVerificationCode();
                this.$message({
                  type: 'error',
                  message: msg
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      fillVerificationCode() {
        var canvas = document.getElementById("canvas");
        var {width, height} = canvas;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = util.getRandomColor(0, 255);
        ctx.font = '30px Helvetica Neue';
        ctx.fillText(this.verificationCode, 10, 35);
        for (let i = 0; i < 150; i++) {
          ctx.fillStyle = util.getRandomColor(0, 255);
          ctx.beginPath();
          ctx.arc(util.getRandomNum(0, width), util.getRandomNum(0, height), 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      },
      getVerificationCode() {
        fetch.get('/captcha').then(({data}) => {
          this.verificationCode = Base64.decode(data).toLowerCase();
          this.fillVerificationCode();
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '验证码获取失败，请联系管理员'
          });
        });
      }
    },
    mounted() {
      this.getVerificationCode();
    }
  };
</script>

<style scoped>
  .login-container {
    height: 100vh;
    background-color: #eef1f6;
  }

  .login-container .title {
    font-size: 40px;
    color: black;
    margin: 0px auto 40px auto;
    text-align: center;
    position: relative;
    font-size: 22px;
  }

  .login-container .title:before, .login-container .title:after {
    content: ''; /*CSS伪类用法*/
    position: absolute; /*定位背景横线的位置*/
    top: 52%;
    width: 36%;
    height: 2px;
  }

  .login-container .title:before {
    background: -webkit-linear-gradient(left, black, white); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, white, black); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, white, black); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, white, black); /* 标准的语法 */
    left: 3%
  }

  .login-container .title:after {
    background: -webkit-linear-gradient(left, white, black); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, black, white); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, black, white); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, black, white); /* 标准的语法 */
    right: 3%
  }

  .login-container .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 350px;
    padding: 68px 68px 72px 72px;
    margin: 5% auto 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
  }

  .login-container .btn {
    width: 100%;
  }

  .login-container-title {
    width: 95%;
    margin: 0 auto;
    height: 75px;
    line-height: 75px;
    font-weight: 600;
    font-size: 21px;
    color: #00a0fb;
    border-bottom: 1px solid #cccccc;
  }

  .yzm .el-form-item__content .el-input {
    width: 70%
  }

  .identifyingCode {
    width: 26%;
    height: 34px;
    border: 1px solid #ccc;
    float: right;
  }

</style>
