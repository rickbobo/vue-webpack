<template>
  <div class="right-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="公司名称">
        <el-input placeholder="请输入公司名称" v-model.trim="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别号">
        <el-input placeholder="请输入纳税人识别号" v-model.trim="searchForm.taxCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="getPageData">查 询</el-button>
      </el-form-item>
    </el-form>
    <div class="manage-header">
      <router-link to="/manage/sellerManageAdd">
        <el-button type="primary">新 增</el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="公司名称：">
              <span>{{props.row.name}}</span>
            </el-form-item>
            <el-form-item label="纳税人识别号：">
              <span>{{props.row.taxCode}}</span>
            </el-form-item>
            <el-form-item label="地址：">
              <span>{{props.row.address}}</span>
            </el-form-item>
            <el-form-item label="联系人手机号：">
              <span>{{props.row.phone}}</span>
            </el-form-item>
            <el-form-item label="开户行：">
              <span>{{props.row.bankName}}</span>
            </el-form-item>
            <el-form-item label="开户行账号：">
              <span>{{props.row.bankAccount}}</span>
            </el-form-item>
            <el-form-item label="开票人：">
              <span>{{props.row.drawer}}</span>
            </el-form-item>
            <el-form-item label="收款人：">
              <span>{{props.row.payee}}</span>
            </el-form-item>
            <el-form-item label="复核人：">
              <span>{{props.row.reviewer}}</span>
            </el-form-item>
            <el-form-item label="联系人邮箱：">
              <span>{{props.row.email}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" prop="name" align="center">
      </el-table-column>
      <el-table-column label="纳税人识别号" prop="taxCode" align="center">
      </el-table-column>
      <el-table-column label="地址" prop="address" align="center">
      </el-table-column>
      <el-table-column label="联系人手机号" prop="phone" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <router-link :to="'/manage/sellerManageModify/' + scope.row.id">
            <el-button size="small">修改</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination :current-page.sync="page.currentPage" :page-size="page.pageSize"
                     :page-count="page.pageCount" :total="page.total" @current-change="handleCurrentPageChange"
                     layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {pageData} from '@/config/mixin';
  import fetch from '@/config/fetch';

  export default {
    mixins: [pageData],
    data() {
      return {
        searchForm: {
          name: '',
          taxCode: ''
        }
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/company/getAll', {
          params: {
            name: this.searchForm.name,
            taxCode: this.searchForm.taxCode,
            pageIndex: this.page.currentPage,
            pageSize: this.page.pageSize
          }
        }).then(({data}) => {
          this.loading = false;
          this.page.total = data.totalCount;
          this.page.pageCount = data.totalPageCount;
          this.pageData = data.result;
        }).catch(() => {
          this.loading = false;
        });
      },
      handleModify(row) {
        this.$router.push('/manage/sellerManageModify/' + encodeURI(JSON.stringify(row)));
      }
    }
  }
</script>

<style scoped>
</style>
