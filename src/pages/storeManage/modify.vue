<template>
  <el-row class="mt-90">
    <el-col :span="14" :offset="5">
      <el-form :model="storeForm" :rules="rules" ref="storeForm" label-position="left" label-width="135px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model.trim="storeForm.companyName" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="门店编号" prop="subNo">
              <el-input v-model.trim="storeForm.subNo" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input placeholder="请输入电话" v-model.trim="storeForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="area">
              <el-cascader placeholder="请选择地区" v-model="area" :options="areaOptions" expand-trigger="hover"
                           @change="handleAreaChange" filterable clearable>
              </el-cascader>
            </el-form-item>
            <el-form-item label="是否展示发票明细" prop="isHideDetail">
              <el-select placeholder="请选择是否展示发票明细" v-model="storeForm.isHideDetail">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="taxCode">
              <el-input v-model.trim="storeForm.taxCode" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="门店名称" prop="name">
              <el-input placeholder="请输入门店名称" v-model.trim="storeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input placeholder="请输入邮箱" v-model.trim="storeForm.email"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input placeholder="请输入地址" v-model.trim="storeForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="6">
            <el-form-item>
              <el-button type="primary" :loading="loading" @click.native.prevent="handleSave('storeForm')">保 存</el-button>
              <el-button @click.native.prevent="handleCancel('storeForm')">取 消</el-button>
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
  import area from '@/assets/json/area';
  import validate from '@/assets/js/validate';

  export default {
    data() {
      const validatorPhone = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validatePhone(value)) {
            callback();
          } else {
            callback(new Error('电话格式不对'));
          }
        } else {
          callback();
        }
      };
      const validatorName = (rule, value, callback) => {
        if (validate.validateStoreName(value)) {
          fetch.get('/store/validName', {
            params: {
              id: this.storeForm.id,
              name: value
            }
          }).then(({data}) => {
            if (data === true) {
              callback();
            } else {
              callback(new Error('门店名称已存在'));
            }
          }).catch(() => {
            callback(new Error('校验门店名称出错'));
          });
        } else {
          callback(new Error('门店名称格式不对'));
        }
      };
      const validatorEmail = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validateEmail(value) && value.length <= 50) {
            callback();
          } else {
            callback(new Error('邮箱格式不对'));
          }
        } else {
          callback();
        }
      };
      const validatorAddress = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validateStoreAddress(value)) {
            callback();
          } else {
            callback(new Error('地址格式不对'));
          }
        } else {
          callback();
        }
      };
      return {
        loading: false,
        storeForm: {
          id: '',
          companyName: '',
          subNo: '',
          phone: '',
          province: '',
          city: '',
          isHideDetail: '',
          taxCode: '',
          name: '',
          email: '',
          address: ''
        },
        rules: {
          phone: [
            {validator: validatorPhone, trigger: 'blur'}
          ],
          isHideDetail: [
            {required: true, message: '请选择是否展示发票明细', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入门店名称', trigger: 'blur'},
            {validator: validatorName, trigger: 'blur'}
          ],
          email: [
            {validator: validatorEmail, trigger: 'blur'}
          ],
          address: [
            {validator: validatorAddress, trigger: 'blur'}
          ]
        },
        areaOptions: area,
        area: ['', '']
      };
    },
    created() {
      this.storeForm.id = this.$route.params.state;
    },
    methods: {
      ...mapActions([DELETE_TAG]),
      handleSave(storeForm) {
        this.$refs[storeForm].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.post('/store/update', util.stringify(this.storeForm)).then(({msg}) => {
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
      handleCancel(storeForm) {
        this.loading = false;
        this.$refs[storeForm].resetFields();
        this.DELETE_TAG({path: this.$route.path});
        this.$router.push('/manage/storeManage');
      },
      handleAreaChange() {
        this.storeForm.province = this.area[0];
        this.storeForm.city = this.area[1];
      }
    },
    mounted() {
      fetch.get('/store/get/' + this.storeForm.id).then(({data}) => {
        util.copyProperties(this.storeForm, data);
        this.$set(this.area, 0, this.storeForm.province);
        this.$set(this.area, 1, this.storeForm.city);
      }).catch(() => {
      });
    }
  }
</script>

<style scoped>
  .el-select {
    width: 100%;
  }

  .el-cascader {
    width: 100%;
  }
</style>
