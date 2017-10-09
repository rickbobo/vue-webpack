<template>
  <div>
    <div class="title">
      发票管理平台
    </div>
    <div class="nav">
      <marquee behavior="scroll" scrollamount="10">用户首次登录时，必须修改密码！</marquee>
    </div>
    <div class="mima">
      <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-position="left" label-width="95px">
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="请输入新密码" type="password" v-model="passwordForm.password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="passwordConfirm">
          <el-input placeholder="请再次输入新密码" type="password" v-model="passwordForm.passwordConfirm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="handleSave('passwordForm')">确 定
          </el-button>
          <el-button @click.native.prevent="handleReset('passwordForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {SET_TOKEN} from '@/store/user';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';
  import validate from '@/assets/js/validate';

  export default {
    data() {
      const validatorPassword = (rule, value, callback) => {
        if (validate.validatePassword(value)) {
          callback();
        } else {
          callback(new Error('密码格式不对'));
        }
      };
      const validatorPasswordConfirm = (rule, value, callback) => {
        if (this.passwordForm.passwordConfirm === this.passwordForm.password) {
          callback();
        } else {
          callback(new Error('两次密码输入不一致'));
        }
      };
      return {
        loading: false,
        passwordForm: {
          password: '',
          passwordConfirm: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: validatorPassword, trigger: 'blur'}
          ],
          passwordConfirm: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: validatorPasswordConfirm, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      ...mapActions([SET_TOKEN]),
      handleSave(passwordForm) {
        this.$refs[passwordForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.post('/resetKey', util.stringify({
              password: this.passwordForm.password
            })).then(() => {
              this.loading = false;
              this.SET_TOKEN().then(() => {
                this.$router.push('/index');
              });
            }).catch(({msg}) => {
              this.loading = false;
              this.$message({
                type: 'error',
                message: msg
              });
            });
          } else {
            return false;
          }
        });
      },
      handleReset(passwordForm) {
        this.loading = false;
        this.$refs[passwordForm].resetFields();
        this.$router.push('/index');
      }
    }
  }
</script>

<style scoped>
  .title {
    height: 70px;
    line-height: 70px;
    font-size: 24px;
    text-indent: 28px;
    background-color: #eef1f6;
  }

  .nav {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #1480c0;
    background: #d6e9f7;
    text-indent: 28px;
  }

  .mima {
    margin: 57px auto;
    width: 326px
  }

  .mima .el-form-item .el-form-item__label:before {
    content: '#'
  }
</style>
