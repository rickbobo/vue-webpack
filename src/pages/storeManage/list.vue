<template>
  <div class="right-container">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="门店名称">
        <el-input placeholder="请输入门店名称" v-model.trim="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-select placeholder="请选择公司名称" v-model="searchForm.companyId" filterable clearable>
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="getPageData">查 询</el-button>
      </el-form-item>
    </el-form>
    <div class="manage-header">
      <router-link to="/manage/storeManageAdd">
        <el-button type="primary">新 增</el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="门店编号：">
              <span>{{props.row.subNo}}</span>
            </el-form-item>
            <el-form-item label="门店名称：">
              <span>{{props.row.name}}</span>
            </el-form-item>
            <el-form-item label="公司名称：">
              <span>{{props.row.companyName}}</span>
            </el-form-item>
            <el-form-item label="纳税人识别号：">
              <span>{{props.row.taxCode}}</span>
            </el-form-item>
            <el-form-item label="电话：">
              <span>{{props.row.phone}}</span>
            </el-form-item>
            <el-form-item label="邮箱：">
              <span>{{props.row.email}}</span>
            </el-form-item>
            <el-form-item label="地区：">
              <span>{{props.row.province}}{{props.row.city}}</span>
            </el-form-item>
            <el-form-item label="地址：">
              <span>{{props.row.address}}</span>
            </el-form-item>
            <el-form-item label="展示发票明细：">
              <span>{{props.row.isHideDetail | isShowInvoiceDetailFilter}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="门店编号" prop="subNo" align="center">
      </el-table-column>
      <el-table-column label="门店名称" prop="name" align="center">
      </el-table-column>
      <el-table-column label="公司名称" prop="companyName" align="center">
      </el-table-column>
      <el-table-column label="纳税人识别号" prop="taxCode" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <router-link :to="'/manage/storeManageModify/' + scope.row.id">
            <el-button size="small">修改</el-button>
          </router-link>
          <el-button size="small" type="danger" @click.native.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  import {pageData, elSelectWidth} from '@/config/mixin';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';

  export default {
    mixins: [pageData, elSelectWidth],
    data() {
      return {
        searchForm: {
          name: '',
          companyId: ''
        },
        companyList: []
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/store/getAll', {
          params: {
            name: this.searchForm.name,
            companyId: this.searchForm.companyId,
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
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该门店, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetch.post('/store/delete/' + row.id).then(({msg}) => {
            this.$message({
              type: 'success',
              message: msg
            });
            this.pageData.splice(index, 1);
          }).catch(({msg}) => {
            this.$message({
              type: 'error',
              message: msg
            });
          });
        }).catch(() => {
        });
      }
    },
    filters: {
      isShowInvoiceDetailFilter(value) {
        return (value === '0') ? '是' : '否';
      }
    },
    mounted() {
      fetch.get('/store/getCompanyList').then(({data}) => {
        this.companyList = data;
      }).catch(() => {
      });
    }
  }
</script>

<style scoped>
</style>
