<template>
  <div class="right-container">
    <div class="main-content-title">
      电子增值税普通发票
    </div>
    <div class="invoice-make">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="2" class="invoice-make-block-title">
              购买方
            </el-col>
            <el-col :span="22" class="invoice-make-block-content">
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">名称:</div>
                <div class="invoice-make-block-item-content">{{invoice.buyerName}}</div>
              </div>
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">纳税人识别号:</div>
                <div class="invoice-make-block-item-content">{{invoice.buyerTaxCode}}</div>
              </div>
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">地址、电话:</div>
                <div class="invoice-make-block-item-content">
                  <template v-if="Boolean(invoice.buyerAddress) && Boolean(invoice.buyerPhone)">
                    {{invoice.buyerAddress}}、{{invoice.buyerPhone}}
                  </template>
                  <template v-else>
                    {{invoice.buyerAddress}}{{invoice.buyerPhone}}
                  </template>
                </div>
              </div>
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">开户行及账户:</div>
                <div class="invoice-make-block-item-content">
                  <template v-if="Boolean(invoice.buyerBankName) && Boolean(invoice.buyerBankAccount)">
                    {{invoice.buyerBankName}}、{{invoice.buyerBankAccount}}
                  </template>
                  <template v-else>
                    {{invoice.buyerBankName}}{{invoice.buyerBankAccount}}
                  </template>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="2" class="invoice-make-block-title invoice-make-block-title-pwd">
              密码区
            </el-col>
            <el-col :span="22" class="invoice-make-block-content">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="invoice-make-content-top text-center">
        <el-col :span="7">
          货物或应税劳务、服务名称
        </el-col>
        <el-col :span="2">
          规格型号
        </el-col>
        <el-col :span="1">
          单位
        </el-col>
        <el-col :span="3">
          数量
        </el-col>
        <el-col :span="3">
          单价（含税）
        </el-col>
        <el-col :span="3">
          金额（含税）
        </el-col>
        <el-col :span="1">
          税率
        </el-col>
        <el-col :span="4">
          税额
        </el-col>
      </el-row>
      <el-row class="invoice-make-content text-center" v-for="(invoiceDetail, index) in invoice.invoiceDetails" :key="index">
        <el-col :span="7">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.name)">
              {{invoiceDetail.name}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.itemModel)">
              {{invoiceDetail.itemModel}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.unit)">
              {{invoiceDetail.unit}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.quantity)">
              {{invoiceDetail.quantity}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.unitPrice)">
              {{invoiceDetail.unitPrice | toFixed(8)}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.totalPrice)">
              {{invoiceDetail.totalPrice | toFixed(2)}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.taxRate)">
              {{invoiceDetail.taxRate}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="font-14">
            <template v-if="isNotBlank(invoiceDetail.taxAmount)">
              {{invoiceDetail.taxAmount | toFixed(2)}}
            </template>
            <template v-else>
              &ensp;
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" class="invoice-make-content-total">
          <span class="invoice-make-content-total-title">合计</span>
        </el-col>
        <el-col :span="4" class="invoice-make-content-total">
          <span>¥：</span>
          <span class="invoice-make-content-total-amount">
            {{invoice.invoiceAmount | toFixed(2)}}
          </span>
        </el-col>
        <el-col :span="4" class="invoice-make-content-total">
          <span>¥：</span>
          <span class="invoice-make-content-total-amount">
            {{invoice.invoiceTaxAmount | toFixed(2)}}
          </span>
        </el-col>
      </el-row>
      <el-row class="invoice-make-content-bottom">
        <el-col :span="14" class="invoice-make-content-bottom-amount">
          <span>价税合计（大写）：</span><span class="invoice-make-content-total-amount">{{invoice.invoiceTotalAmount | formatRMB}}</span>
        </el-col>
        <el-col :span="10" class="invoice-make-content-bottom-amount">
          <span>（小写）：</span><span class="invoice-make-content-total-amount">{{invoice.invoiceTotalAmount | formatCurrency}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="2" class="invoice-make-block-title ">
              销售方
            </el-col>
            <el-col :span="22" class="invoice-make-block-content invoice-make-block-content-xf">
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">名称:</div>
                <div class="invoice-make-block-item-content">{{invoice.sellerName}}</div>
              </div>
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">纳税人识别号:</div>
                <div class="invoice-make-block-item-content">{{invoice.sellerTaxCode}}</div>
              </div>
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">地址、电话:</div>
                <div class="invoice-make-block-item-content">
                  <template v-if="Boolean(invoice.sellerAddress) && Boolean(invoice.sellerPhone)">
                    {{invoice.sellerAddress}}、{{invoice.sellerPhone}}
                  </template>
                  <template v-else>
                    {{invoice.sellerAddress}}{{invoice.sellerPhone}}
                  </template>
                </div>
              </div>
              <div class="invoice-make-block-item">
                <div class="invoice-make-block-item-title">开户行及账户:</div>
                <div class="invoice-make-block-item-content">
                  <template v-if="Boolean(invoice.sellerBankName) && Boolean(invoice.sellerBankAccount)">
                    {{invoice.sellerBankName}}、{{invoice.sellerBankAccount}}
                  </template>
                  <template v-else>
                    {{invoice.sellerBankName}}{{invoice.sellerBankAccount}}
                  </template>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="2" class="invoice-make-block-title invoice-make-block-title-bz">
              备注
            </el-col>
            <el-col :span="22" class="invoice-make-block-content">
              <div class="invoice-make-block-content-remark">
                {{invoice.invoiceRemark}}
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="7">
        <div class="footer-message">
          <span>收款人：</span>
          <div class="footer-message-content">{{invoice.cashier}}</div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="footer-message">
          <span>复核人：</span>
          <div class="footer-message-content">{{invoice.checker}}</div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="footer-message">
          <span>开票人：</span>
          <div class="footer-message-content">{{invoice.drawer}}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="footer-message">
          <span>销售方(章)：</span>
          <div class="footer-message-content"></div>
        </div>
      </el-col>
    </el-row>
    <el-row class="invoice-make-bottom">
      <el-col :span="7">
        <div class="footer-message">
          <span>收票人邮箱：</span>
          <div class="footer-message-content">{{invoice.buyerEmail}}</div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="footer-message">
          <span>门店名称：</span>
          <div class="footer-message-content">{{invoice.storeName}}</div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="footer-message">
          <span>销售单据号：</span>
          <div class="footer-message-content">{{invoice.ticketNum}}</div>
        </div>
      </el-col>
    </el-row>
    <div class="mt-20 text-center">
      <el-button type="primary" @click.native.prevent="handleGoBack">返 回</el-button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {DELETE_TAG} from '@/store/header-tag';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';

  export default {
    data() {
      return {
        invoiceId: '',
        invoice: {
          buyerName: '',
          buyerTaxCode: '',
          buyerAddress: '',
          buyerPhone: '',
          buyerBankName: '',
          buyerBankAccount: '',
          buyerEmail: '',
          sellerName: '',
          sellerTaxCode: '',
          sellerAddress: '',
          sellerPhone: '',
          sellerBankName: '',
          sellerBankAccount: '',
          cashier: '',
          checker: '',
          drawer: '',
          invoiceRemark: '',
          invoiceAmount: '',
          invoiceTaxAmount: '',
          invoiceTotalAmount: '',
          storeName: '',
          ticketNum: '',
          invoiceDetails: []
        }
      };
    },
    created() {
      this.invoiceId = this.$route.params.state;
    },
    methods: {
      ...mapActions([DELETE_TAG]),
      isNotBlank(val) {
        return val !== '' && typeof val !== 'undefined';
      },
      handleGoBack() {
        this.DELETE_TAG({path: this.$route.path});
        this.$router.push('/query/invoiceQuery');
      }
    },
    mounted() {
      fetch.get('/invoiceQuery/viewInfo/' + this.invoiceId).then(({data}) => {
        util.copyProperties(this.invoice, data);
      }).catch(({msg}) => {
        this.$message({
          type: 'error',
          message: msg
        });
      });
    }
  }
</script>

<style scoped>
  .invoice-make {
    border: 1px solid #bce8f1;
    margin-top: 20px;
  }

  .invoice-make-block-title {
    padding: 82px 12px;
    width: 40px;
    line-height: 24px;
    color: #2f708e;
    border-right: 1px solid #bce8f1;
  }

  .el-form-item {
    padding-left: 2%;
  }

  .el-col-el-form-item {
    padding-left: 0;
  }

  .invoice-make-block-title-pwd {
    border-left: 1px solid #bce8f1;
  }

  .invoice-make-content-top {
    border-top: 1px solid #bce8f1;
    border-bottom: 1px solid #bce8f1;
    height: 35px;
    line-height: 35px;
    color: #2f708e;
    font-size: 16px;
  }

  .invoice-make-content {
    line-height: 30px;
    height: 30px;
  }

  .invoice-make-content-bottom {
    border-top: 1px solid #bce8f1;
    height: 30px;
    line-height: 30px;
  }

  .invoice-make-content .el-form-item {
    width: 95%;
  }

  .el-checkbox__label {
    display: none;
  }

  .invoice-make-content-total {
    height: 30px;
    line-height: 30px;
  }

  .invoice-make-content-total span {
    color: #2f708e;
  }

  .invoice-make-content-total-title {
    padding-left: 10px;
  }

  .invoice-make-content-total .invoice-make-content-total-amount, .invoice-make-content-bottom-amount .invoice-make-content-total-amount {
    font-size: 14px;
    color: #1f2d3d;
  }

  .invoice-make-content-bottom {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #bce8f1;
  }

  .invoice-make-content-bottom-amount span {
    color: #2f708e;
  }

  .invoice-make-content-bottom-amount:nth-of-type(1) {
    padding-left: 10px;
  }

  .invoice-make-block-content-xf .el-select {
    width: 100%;
  }

  .invoice-make-block-title-bz {
    padding: 94px 12px;
    border-left: 1px solid #bce8f1;
  }

  .invoice-make-block-item {
    margin-bottom: 20px;
    margin-top: 3%;
    width: 100%;
    height: 30px
  }

  .invoice-make-block-item-title {
    color: #2f708e;
    font-size: 14px;
    width: 17%;
    margin-left: 10px;
    display: inline-block;
    line-height: 30px
  }

  .invoice-make-block-item-content {
    font-size: 14px;
    display: inline-block;
    line-height: 30px
  }

  .invoice-make-block-content-remark {
    border: 1px solid #D3DCE6;
    width: 90%;
    border-radius: 7px;
    margin: 2% auto;
    height: 200px;
    font-size: 14px;
  }

  .footer-message {
    width: 100%;
    height: 100%;
    margin-top: 20px
  }

  .footer-message-content {
    display: inline-block;
    width: 60%;
    font-size: 14px;
  }

  .footer-message span {
    display: inline-block;
    color: #2f708e
  }
</style>
