<template>
  <el-row class="mt-90">
    <el-col :span="6" :offset="8">
      <el-form :model="roleForm" :rules="rules" ref="roleForm" label-position="left" label-width="80px">
        <el-form-item label="角色编号" prop="roleNum">
          <el-input placeholder="请输入角色编号" v-model.trim="roleForm.roleNum"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model.trim="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="handleSave('roleForm')">保 存</el-button>
          <el-button @click.native.prevent="handleCancel('roleForm')">取 消</el-button>
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
      const validatorRoleNum = (rule, value, callback) => {
        if (validate.validateRoleNum(value)) {
          fetch.get('/role/validRoleNum', {
            params: {
              roleNum: this.roleForm.roleNum
            }
          }).then(({data}) => {
            if (data === true) {
              callback();
            } else {
              callback(new Error('角色编号已存在'));
            }
          }).catch(() => {
            callback(new Error('校验角色编号出错'));
          });
        } else {
          callback(new Error('角色编号格式不对'));
        }
      };
      const validatorRoleName = (rule, value, callback) => {
        if (validate.validateRoleName(value)) {
          callback();
        } else {
          callback(new Error('角色名称格式不对'));
        }
      };
      return {
        loading: false,
        roleForm: {
          roleNum: '',
          roleName: ''
        },
        rules: {
          roleNum: [
            {required: true, message: '请输入角色编号', trigger: 'blur'},
            {validator: validatorRoleNum, trigger: 'blur'}
          ],
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {validator: validatorRoleName, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      ...mapActions([DELETE_TAG]),
      handleSave(roleForm) {
        this.$refs[roleForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.post('/role/save', util.stringify(this.roleForm)).then(({msg}) => {
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
      handleCancel(roleForm) {
        this.loading = false;
        this.$refs[roleForm].resetFields();
        this.DELETE_TAG({path: this.$route.path});
        this.$router.push('/manage/roleManage');
      }
    }
  }
</script>

<style scoped>
</style>
