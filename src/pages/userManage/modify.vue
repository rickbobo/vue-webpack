<template>
  <el-row class="mt-90">
    <el-col :span="6" :offset="8">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-position="left" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" type="password" v-model.trim="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passwordConfirm">
          <el-input placeholder="请再次输入密码" type="password" v-model.trim="userForm.passwordConfirm"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleId">
          <el-select placeholder="请选择角色名称" v-model="userForm.roleId" filterable>
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="handleSave('userForm')">保 存</el-button>
          <el-button @click.native.prevent="handleCancel('userForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import {Base64} from 'js-base64';
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
        if (this.userForm.passwordConfirm === this.userForm.password) {
          callback();
        } else {
          callback(new Error('两次密码输入不一致'));
        }
      };
      return {
        loading: false,
        userForm: {
          id: '',
          userName: '',
          password: '',
          passwordConfirm: '',
          roleId: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatorPassword, trigger: 'blur'}
          ],
          passwordConfirm: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatorPasswordConfirm, trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请选择角色名称', trigger: 'change'}
          ]
        },
        roleList: [],
        passwordValue: ''
      };
    },
    created() {
      this.userForm.id = this.$route.params.state;
    },
    methods: {
      ...mapActions([DELETE_TAG]),
      handleSave(userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            var password = '';
            if (this.userForm.password !== this.passwordValue) {
              password = this.userForm.password;
            }
            fetch.post('/user/update', util.stringify({
              id: this.userForm.id,
              password: password,
              roleId: this.userForm.roleId
            })).then(({msg}) => {
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
      handleCancel(userForm) {
        this.loading = false;
        this.$refs[userForm].resetFields();
        this.DELETE_TAG({path: this.$route.path});
        this.$router.push('/manage/userManage');
      }
    },
    mounted() {
      fetch.get('/role/listRoles').then(({data}) => {
        this.roleList = data;
      }).catch(() => {
      });
      fetch.get('/user/get/' + this.userForm.id).then(({data}) => {
        this.userForm.password = this.userForm.passwordConfirm = this.passwordValue = Base64.encode(Date.now());
        util.copyProperties(this.userForm, data);
      }).catch(() => {
      });
    }
  }
</script>

<style scoped>
  .el-select {
    width: 100%;
  }
</style>
