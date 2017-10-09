<template>
  <div class="right-container">
    <div class="main-content-title mb-20">
      处理成功
    </div>
    <div>
      <el-table v-loading="loading" :data="successData" empty-text="暂无数据">
        <el-table-column label="销售单据号" prop="ticketNum" align="center">
        </el-table-column>
        <el-table-column label="门店号" prop="subNo" align="center">
        </el-table-column>
        <el-table-column label="购买方名称" prop="buyerName" align="center">
        </el-table-column>
        <el-table-column label="货物或应税劳务、服务名称" prop="taxName" align="center" width="220">
        </el-table-column>
        <el-table-column label="价税合计金额" prop="totalPrice" align="center">
        </el-table-column>
        <el-table-column label="税率" prop="taxRate" align="center" :formatter="taxRateFilter">
        </el-table-column>
        <el-table-column label="收票人邮箱" prop="buyerEmail" align="center">
        </el-table-column>
        <el-table-column label="开票状态" align="center">
          <template scope="scope">
            <el-tag type="primary" v-if="scope.row.status === '1'">开票中</el-tag>
            <el-tag type="warning" v-if="scope.row.status === '2'">已开票待签章</el-tag>
            <el-tag type="gray" v-if="scope.row.status === '3'">开票成功</el-tag>
            <el-tag type="danger" v-if="scope.row.status === '4'">开票失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status === '5'">签章失败</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main-content-title mb-20">
      处理失败
    </div>
    <div>
      <el-table v-loading="loading" :data="failData" empty-text="暂无数据">
        <el-table-column label="销售单据号" prop="ticketNum" align="center">
        </el-table-column>
        <el-table-column label="门店号" prop="subNo" align="center">
        </el-table-column>
        <el-table-column label="购买方名称" prop="buyerName" align="center">
        </el-table-column>
        <el-table-column label="货物或应税劳务、服务名称" prop="taxName" align="center" width="220">
        </el-table-column>
        <el-table-column label="价税合计金额" prop="totalPrice" align="center">
        </el-table-column>
        <el-table-column label="失败原因" prop="failReason" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="mt-20 text-center">
      <el-button type="primary" @click.native.prevent="handleGoBack">返 回</el-button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {DELETE_TAG} from '@/store/header-tag';
  import fetch from '@/config/fetch';
  export default {
    data() {
      return {
        loading: true,
        headId: '',
        successData: [],
        failData: []
      };
    },
    created() {
      this.headId = this.$route.params.state;
    },
    methods: {
      ...mapActions([DELETE_TAG]),
      taxRateFilter({taxRate}) {
        if (taxRate !== '') {
          return taxRate * 100 + '%';
        } else {
          return '';
        }
      },
      handleGoBack() {
        this.DELETE_TAG({path: this.$route.path});
        this.$router.push('/invoice/batchInvoiceMake');
      }
    },
    mounted() {
      this.loading = true;
      fetch.get('/invoiceBatch/getAllDetails/' + this.headId).then(({data}) => {
        this.loading = false;
        this.successData = data.success;
        this.failData = data.fail;
      }).catch(() => {
        this.loading = false;
      });
    }
  };
</script>

<style scoped>
</style>
