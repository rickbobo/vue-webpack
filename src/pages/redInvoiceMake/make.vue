<template>
  <div class="right-container">
    <div class="main-content-title">
      电子增值税普通发票
    </div>
    <el-row class="mt-40">
      <el-col :span="6" :offset="8">
        <el-form :model="redInvoiceForm" :rules="rules" ref="redInvoiceForm" label-position="left" label-width="100px">
          <el-form-item label="原发票代码" prop="originalInvoiceCode">
            <el-input placeholder="请输入原发票代码" v-model.trim="redInvoiceForm.originalInvoiceCode"></el-input>
          </el-form-item>
          <el-form-item label="原发票号码" prop="originalInvoiceNo">
            <el-input placeholder="请输入原发票号码" v-model.trim="redInvoiceForm.originalInvoiceNo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click.native.prevent="handleNext('redInvoiceForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import fetch from '@/config/fetch';
  import validate from '@/assets/js/validate';

  export default {
    data(){
      const validatorOriginalInvoiceCode = (rule, value, callback) => {
        if (validate.validateInvoiceCode(value)) {
          callback();
        } else {
          callback(new Error('原发票代码格式不对'));
        }
      };
      const validatorOriginalInvoiceNo = (rule, value, callback) => {
        if (validate.validateInvoiceNo(value)) {
          callback();
        } else {
          callback(new Error('原发票号码格式不对'));
        }
      };
      return {
        loading: false,
        redInvoiceForm: {
          originalInvoiceCode: '',
          originalInvoiceNo: ''
        },
        rules: {
          originalInvoiceCode: [
            {required: true, message: '请输入原发票代码', trigger: 'blur'},
            {validator: validatorOriginalInvoiceCode, trigger: 'blur'}
          ],
          originalInvoiceNo: [
            {required: true, message: '请输入原发票号码', trigger: 'blur'},
            {validator: validatorOriginalInvoiceNo, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleNext(userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.get('/invoiceRed/getInvoiceRed', {
              params: {
                originalInvoiceCode: this.redInvoiceForm.originalInvoiceCode,
                originalInvoiceNo: this.redInvoiceForm.originalInvoiceNo
              }
            }).then(() => {
              this.loading = false;
              this.$router.push('/invoice/redInvoiceMakeNext/' + encodeURI(JSON.stringify({
                originalInvoiceCode: this.redInvoiceForm.originalInvoiceCode,
                originalInvoiceNo: this.redInvoiceForm.originalInvoiceNo
              })));
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
      }
    }
  };
</script>

<style scoped>
</style>
