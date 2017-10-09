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
      <el-form-item label="销售单据号">
        <el-input placeholder="请输入销售单据号" v-model.trim="searchForm.ticketNum"></el-input>
      </el-form-item>
      <el-form-item label="购买方名称">
        <el-input placeholder="请输入购买方名称" v-model.trim="searchForm.buyerName"></el-input>
      </el-form-item>
      <el-form-item label="发票代码">
        <el-input placeholder="请输入发票代码" v-model.trim="searchForm.invoiceCode"></el-input>
      </el-form-item>
      <el-form-item label="发票号码">
        <el-input placeholder="请输入发票号码" v-model.trim="searchForm.invoiceNo"></el-input>
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
      <el-form-item label="开票状态">
        <el-select placeholder="请选择开票状态" v-model="searchForm.invoiceStatus" clearable>
          <el-option label="开票中" value="1"></el-option>
          <el-option label="已开票待签章" value="2"></el-option>
          <el-option label="开票成功" value="3"></el-option>
          <el-option label="开票失败" value="4"></el-option>
          <el-option label="签章失败" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮件发送状态">
        <el-select placeholder="请选择邮件发送状态" v-model="searchForm.isSendEmail" clearable>
          <el-option label="未发送" :value="0"></el-option>
          <el-option label="已发送" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="getPageData">查 询</el-button>
      </el-form-item>
    </el-form>
    <div class="manage-header">
      <el-button type="primary" @click.native.prevent="handleExportDetail">导出明细</el-button>
    </div>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="门店名称：">
              <span>{{props.row.storeName}}</span>
            </el-form-item>
            <el-form-item label="销售单据号：">
              <span>{{props.row.ticketNum}}</span>
            </el-form-item>
            <el-form-item label="购买方名称：">
              <span>{{props.row.buyerName}}</span>
            </el-form-item>
            <el-form-item label="发票代码：">
              <span>{{props.row.invoiceCode}}</span>
            </el-form-item>
            <el-form-item label="发票号码：">
              <span>{{props.row.invoiceNo}}</span>
            </el-form-item>
            <el-form-item label="开票日期：">
              <span>{{props.row.invoiceDate}}</span>
            </el-form-item>
            <el-form-item label="价税合计金额：">
              <span>{{props.row.invoiceTotalAmount}}</span>
            </el-form-item>
            <el-form-item label="销售方名称：">
              <span>{{props.row.sellerName}}</span>
            </el-form-item>
            <el-form-item label="开票人：">
              <span>{{props.row.drawer}}</span>
            </el-form-item>
            <el-form-item label="开票状态：">
              <span>{{props.row.invoiceStatus | invoiceStatusFilter}}</span>
            </el-form-item>
            <el-form-item label="邮件发送状态：">
              <span>{{props.row.isSendEmail | isSendEmailFilter}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="销售单据号" prop="ticketNum" align="center" width="120">
      </el-table-column>
      <el-table-column label="购买方名称" prop="buyerName" align="center" width="120">
      </el-table-column>
      <el-table-column label="发票代码" prop="invoiceCode" align="center" width="130">
      </el-table-column>
      <el-table-column label="发票号码" prop="invoiceNo" align="center" width="120">
      </el-table-column>
      <el-table-column label="开票日期" prop="invoiceDate" align="center" width="120">
      </el-table-column>
      <el-table-column label="价税合计金额" prop="invoiceTotalAmount" align="center" width="120">
      </el-table-column>
      <el-table-column label="开票状态" prop="invoiceStatus" align="center" width="100">
        <template scope="scope">
          <el-tag type="primary" v-if="scope.row.invoiceStatus === '1'">开票中</el-tag>
          <el-tag type="gray" v-if="scope.row.invoiceStatus === '3'">开票成功</el-tag>
          <el-popover trigger="hover" placement="top">
            <p>失败原因: {{scope.row.msg}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="danger" v-if="scope.row.invoiceStatus === '4'">开票失败</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="邮件发送状态" prop="isSendEmail" align="center" width="120" :formatter="isSendEmailFilter">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button size="small" @click.native.prevent="handleViewInvoice(scope.row)">查看</el-button>
          <el-button size="small" @click.native.prevent="handleDownloadInvoice(scope.row)"
                     v-if="scope.row.invoiceStatus === '3'">下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination :current-page.sync="page.currentPage" :page-size="page.pageSize"
                     :page-count="page.pageCount" :total="page.total" @current-change="handleCurrentPageChange"
                     layout="prev, pager, next">
      </el-pagination>
    </div>
    <div v-show="false">
      <img id="image" :src="imageSrc" alt="Picture">
    </div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import {pageData, dateTimePickerOption, elSelectWidth, elDateEditorWidth} from '@/config/mixin';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';

  export default{
    mixins: [pageData, dateTimePickerOption, elSelectWidth, elDateEditorWidth],
    data() {
      return {
        searchForm: {
          companyId: '',
          storeId: '',
          ticketNum: '',
          buyerName: '',
          invoiceCode: '',
          invoiceNo: '',
          invoiceDate: '',
          invoiceDateStart: '',
          invoiceDateEnd: '',
          invoiceType: '',
          invoiceStatus: '',
          isSendEmail: ''
        },
        companyList: [],
        storeList: [],
        imageSrc: '',
        viewer: {}
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/invoiceQuery/query', {
          params: {
            companyId: this.searchForm.companyId,
            storeId: this.searchForm.storeId,
            ticketNum: this.searchForm.ticketNum,
            buyerName: this.searchForm.buyerName,
            invoiceCode: this.searchForm.invoiceCode,
            invoiceNo: this.searchForm.invoiceNo,
            invoiceDateStart: this.searchForm.invoiceDateStart,
            invoiceDateEnd: this.searchForm.invoiceDateEnd,
            invoiceType: this.searchForm.invoiceType,
            invoiceStatus: this.searchForm.invoiceStatus,
            isSendEmail: this.searchForm.isSendEmail,
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
          fetch.get('/invoiceQuery/getAvailableStore/' + companyId).then(({data}) => {
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
      },
      handleExportDetail() {
        fetch.get('/loginStatus').then(() => {
          var {companyId, storeId, ticketNum, buyerName, invoiceCode, invoiceNo, invoiceDateStart, invoiceDateEnd, invoiceType, invoiceStatus, isSendEmail} = this.searchForm;
          var url = '/duck/invoiceQuery/queryToExcel' +
            '?companyId=' + companyId +
            '&storeId=' + storeId +
            '&ticketNum=' + ticketNum +
            '&buyerName=' + buyerName +
            '&invoiceCode=' + invoiceCode +
            '&invoiceNo=' + invoiceNo +
            '&invoiceDateStart=' + invoiceDateStart +
            '&invoiceDateEnd=' + invoiceDateEnd +
            '&invoiceType=' + invoiceType +
            '&invoiceStatus=' + invoiceStatus +
            '&isSendEmail=' + isSendEmail;
          var fileName = '发票查询.xls';
          util.downloadFile(url, fileName);
        }).catch(() => {
        });
      },
      isSendEmailFilter({isSendEmail}) {
        if (isSendEmail === 0) {
          return '未发送';
        } else if (isSendEmail === 1) {
          return '已发送';
        } else {
          return '';
        }
      },
      handleViewInvoice({id, invoiceStatus}) {
        if (invoiceStatus === '3') {
          fetch.get('/invoiceQuery/viewImage/' + id).then(({data}) => {
            this.imageSrc = 'data:image/png;base64,' + data;
            this.viewer.show();
          }).catch(({msg}) => {
            this.$message({
              type: 'error',
              message: msg
            });
          });
        } else {
          this.$router.push('/query/invoiceQueryDetail/' + id);
        }
      },
      handleDownloadInvoice({id, invoiceCode, invoiceNo}) {
        fetch.get('/loginStatus').then(() => {
          var url = '/duck/invoiceQuery/download/' + id;
          var fileName = invoiceCode + invoiceNo + '.pdf';
          util.downloadFile(url, fileName);
        }).catch(() => {
        });
      }
    },
    filters: {
      invoiceStatusFilter(val) {
        switch (val) {
          case '1':
            return '开票中';
          case '2':
            return '已开票待签章';
          case '3':
            return '开票成功';
          case '4':
            return '开票失败';
          case '5':
            return '签章失败';
          default:
            return '';
        }
      },
      isSendEmailFilter(val) {
        if (val === 0) {
          return '未发送';
        } else if (val === 1) {
          return '已发送';
        } else {
          return '';
        }
      }
    },
    mounted() {
      fetch.get('/invoiceQuery/getAvailableCompany').then(({data}) => {
        this.companyList = data;
      }).catch(() => {
      });
      this.viewer = new Viewer(document.getElementById('image'), {navbar: false, toolbar: false});
    }
  }
</script>

<style scoped>
</style>
