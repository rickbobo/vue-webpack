<template>
  <el-row class="mt-90">
    <el-col :span="6" :offset="8">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-position="left" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input placeholder="请输入用户名" v-model.trim="userForm.userName"></el-input>
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
  import {mapActions} from 'vuex';
  import {DELETE_TAG} from '@/store/header-tag';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';
  import validate from '@/assets/js/validate';

  export default {
    data() {
      const validatorUserName = (rule, value, callback) => {
        if (validate.validateUserName(value)) {
          fetch.get('/user/validName/' + value).then(({data}) => {
            if (data === true) {
              callback();
            } else {
              callback(new Error('用户名已存在'));
            }
          }).catch(() => {
            callback(new Error('校验用户名出错'));
          });
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
          userName: '',
          password: '',
          passwordConfirm: '',
          roleId: ''
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
          passwordConfirm: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatorPasswordConfirm, trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请选择角色名称', trigger: 'change'}
          ]
        },
        roleList: []
      };
    },
    methods: {
      ...mapActions([DELETE_TAG]),
      handleSave(userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.post('/user/save', util.stringify(this.userForm)).then(({msg}) => {
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
    }
  }
</script>

<style scoped>
  .el-select {
    width: 100%;
  }
</style>
