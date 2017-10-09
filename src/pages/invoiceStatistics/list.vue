<template>
  <div class="right-container">
    <el-form :inline="true" :model="searchForm" label-position="left" label-width="100px" class="search-form">
      <el-form-item label="销售方名称">
        <el-select placeholder="请选择销售方名称" v-model="searchForm.companyId" filterable clearable
                   @change="handleCompanyChange">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门店名称">
        <el-select placeholder="请选择门店名称" v-model="searchForm.storeId" filterable clearable @visible-change="handleStoreIdVisible">
          <el-option v-for="item in storeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开票日期">
        <el-date-picker v-model="searchForm.invoiceDate" placeholder="选择开票日期" type="daterange"
                        :picker-options="pickerOptions" format="yyyy-MM-dd" :editable="false" clearable
                        @change="handleInvoiceDateChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发票类型">
        <el-select placeholder="请选择发票类型" v-model="searchForm.invoiceType" clearable>
          <el-option label="蓝字发票" value="0"></el-option>
          <el-option label="红字发票" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="getPageData">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column label="销售方名称" prop="sellerName" align="center">
      </el-table-column>
      <el-table-column label="纳税人识别号" prop="sellerTaxCode" align="center">
      </el-table-column>
      <el-table-column label="门店名称" prop="storeName" align="center">
      </el-table-column>
      <el-table-column label="开票成功数量" prop="invoiceCount" align="center">
      </el-table-column>
      <el-table-column label="开票总税额" prop="invoiceTaxAmountCount" align="center">
      </el-table-column>
      <el-table-column label="开票总金额" prop="invoiceAmountCount" align="center">
      </el-table-column>
      <el-table-column label="总价税合计金额" prop="invoiceTotalAmountCount" align="center">
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
  import {pageData, dateTimePickerOption} from '@/config/mixin';
  import fetch from '@/config/fetch';

  export default {
    mixins: [pageData, dateTimePickerOption],
    data(){
      return {
        searchForm: {
          companyId: '',
          storeId: '',
          invoiceDate: '',
          invoiceDateStart: '',
          invoiceDateEnd: '',
          invoiceType: ''
        },
        companyList: [],
        storeList: []
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/invoiceStatistics/query', {
          params: {
            companyId: this.searchForm.companyId,
            storeId: this.searchForm.storeId,
            invoiceDateStart: this.searchForm.invoiceDateStart,
            invoiceDateEnd: this.searchForm.invoiceDateEnd,
            invoiceType: this.searchForm.invoiceType,
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
      handleCompanyChange(companyId) {
        this.storeList = [];
        this.searchForm.storeId = '';
        if (Boolean(companyId)) {
          fetch.get('/invoiceStatistics/getAvailableStore/' + companyId).then(({data}) => {
            this.storeList = data;
          }).catch(() => {
          });
        }
      },
      handleStoreIdVisible(val) {
        if (val && !Boolean(this.searchForm.companyId)) {
          this.$message('请先选择销售方名称');
        }
      },
      handleInvoiceDateChange(invoiceDate) {
        if (Boolean(invoiceDate)) {
          var [invoiceDateStart, invoiceDateEnd] = invoiceDate.split(' - ');
          this.searchForm.invoiceDateStart = invoiceDateStart;
          this.searchForm.invoiceDateEnd = invoiceDateEnd;
        } else {
          this.searchForm.invoiceDateStart = '';
          this.searchForm.invoiceDateEnd = '';
        }
      }
    },
    mounted() {
      fetch.get('/invoiceStatistics/getAvailableCompany').then(({data}) => {
        this.companyList = data;
      }).catch(() => {
      });
    }
  };
</script>

<style scoped>
  .search-form .el-select{
    width: 83%;
  }
  .search-form .el-date-editor{
    width: 83%;
  }
</style>
