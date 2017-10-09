<template>
  <el-row class="mt-90">
    <el-col :span="6" :offset="8">
      <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-position="left" label-width="95px">
        <el-form-item label="原密码" prop="passwordOld">
          <el-input placeholder="请输入原密码" type="password" v-model="passwordForm.passwordOld"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="请输入新密码" type="password" v-model="passwordForm.password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="passwordConfirm">
          <el-input placeholder="请再次输入新密码" type="password" v-model="passwordForm.passwordConfirm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="handleSave('passwordForm')">保 存</el-button>
          <el-button @click.native.prevent="handleReset('passwordForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';
  import {DELETE_TAG} from '@/store/header-tag';
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
          passwordOld: '',
          password: '',
          passwordConfirm: ''
        },
        rules: {
          passwordOld: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
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
      ...mapActions([DELETE_TAG]),
      handleSave(passwordForm) {
        this.$refs[passwordForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.post('/resetKeys', util.stringify(this.passwordForm)).then(({msg}) => {
              this.loading = false;
              this.$message({
                type: 'success',
                message: msg
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
        this.DELETE_TAG({path: this.$route.path});
        this.$router.push('/index');
      }
    }
  }
</script>

<style scoped>
</style>
