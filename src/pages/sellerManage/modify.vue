<template>
  <el-row class="mt-90">
    <el-col :span="14" :offset="5">
      <el-form :model="sellerForm" :rules="rules" ref="sellerForm" label-position="left" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="name">
              <el-input v-model.trim="sellerForm.name" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input placeholder="请输入地址" v-model.trim="sellerForm.address"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="bankName">
              <el-input placeholder="请输入开户行" v-model.trim="sellerForm.bankName"></el-input>
            </el-form-item>
            <el-form-item label="收款人" prop="payee">
              <el-input placeholder="请输入收款人" v-model.trim="sellerForm.payee"></el-input>
            </el-form-item>
            <el-form-item label="复核人" prop="reviewer">
              <el-input placeholder="请输入复核人" v-model.trim="sellerForm.reviewer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="taxCode">
              <el-input v-model.trim="sellerForm.taxCode" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号" prop="phone">
              <el-input placeholder="请输入联系人手机号" v-model.trim="sellerForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="开户行账号" prop="bankAccount">
              <el-input placeholder="请输入开户行账号" v-model.trim="sellerForm.bankAccount"></el-input>
            </el-form-item>
            <el-form-item label="开票人" prop="drawer">
              <el-input placeholder="请输入开票人" v-model.trim="sellerForm.drawer"></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱" prop="email">
              <el-input placeholder="请输入联系人邮箱" v-model.trim="sellerForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="6">
            <el-form-item>
              <el-button type="primary" :loading="loading" @click.native.prevent="handleSave('sellerForm')">保 存
              </el-button>
              <el-button @click.native.prevent="handleCancel('sellerForm')">取 消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      const validatorAddress = (rule, value, callback) => {
        if (validate.validateAddress(value)) {
          callback();
        } else {
          callback(new Error('地址格式不对'));
        }
      };
      const validatorBankName = (rule, value, callback) => {
        if (validate.validateBankName(value)) {
          callback();
        } else {
          callback(new Error('开户行格式不对'));
        }
      };
      const validatorPayee = (rule, value, callback) => {
        if (validate.validatePayee(value)) {
          callback();
        } else {
          callback(new Error('收款人格式不对'));
        }
      };
      const validatorReviewer = (rule, value, callback) => {
        if (validate.validateReviewer(value)) {
          callback();
        } else {
          callback(new Error('复核人格式不对'));
        }
      };
      const validatorPhone = (rule, value, callback) => {
        if (validate.validateMobile(value)) {
          callback();
        } else {
          callback(new Error('联系人手机号格式不对'));
        }
      };
      const validatorBankAccount = (rule, value, callback) => {
        if (validate.validateBankAccount(value)) {
          callback();
        } else {
          callback(new Error('开户行账号格式不对'));
        }
      };
      const validatorDrawer = (rule, value, callback) => {
        if (validate.validateDrawer(value)) {
          callback();
        } else {
          callback(new Error('开票人格式不对'));
        }
      };
      const validatorEmail = (rule, value, callback) => {
        if (validate.validateEmail(value) && value.length <= 50) {
          callback();
        } else {
          callback(new Error('联系人邮箱格式不对'));
        }
      };
      return {
        loading: false,
        sellerForm: {
          id: '',
          name: '',
          address: '',
          bankName: '',
          payee: '',
          reviewer: '',
          taxCode: '',
          phone: '',
          bankAccount: '',
          drawer: '',
          email: ''
        },
        rules: {
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'},
            {validator: validatorAddress, trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '请输入开户行', trigger: 'blur'},
            {validator: validatorBankName, trigger: 'blur'}
          ],
          payee: [
            {required: true, message: '请输入收款人', trigger: 'blur'},
            {validator: validatorPayee, trigger: 'blur'}
          ],
          reviewer: [
            {required: true, message: '请输入复核人', trigger: 'blur'},
            {validator: validatorReviewer, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系人手机号', trigger: 'blur'},
            {validator: validatorPhone, trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, message: '请输入开户行账号', trigger: 'blur'},
            {validator: validatorBankAccount, trigger: 'blur'}
          ],
          drawer: [
            {required: true, message: '请输入开票人', trigger: 'blur'},
            {validator: validatorDrawer, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '联系人邮箱', trigger: 'blur'},
            {validator: validatorEmail, trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.sellerForm.id = this.$route.params.state;
    },
    methods: {
      ...mapActions([DELETE_TAG]),
      handleSave(sellerForm) {
        this.$refs[sellerForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.post('/company/update', util.stringify(this.sellerForm)).then(({msg}) => {
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
      handleCancel(sellerForm) {
        this.loading = false;
        this.$refs[sellerForm].resetFields();
        this.DELETE_TAG({path: this.$route.path});
        this.$router.push('/manage/sellerManage');
      }
    },
    mounted() {
      fetch.get('/company/get/' + this.sellerForm.id).then(({data}) => {
        util.copyProperties(this.sellerForm, data);
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
