<template>
  <div class="right-container">
    <div class="main-content-title">
      电子增值税普通发票
      <div class="main-content-title-button">
        <el-button type="primary" @click.native.prevent="handleAddInvoiceItem">增加商品行</el-button>
        <el-button type="primary" @click.native.prevent="handleAddInvoiceDiscountItem">增加折扣行</el-button>
        <el-button type="primary" @click.native.prevent="handleDeleteInvoiceItem">删除行</el-button>
      </div>
    </div>
    <el-form :model="invoiceMakeForm" :rules="rules" ref="invoiceMakeForm" label-position="left" label-width="120px">
      <div class="invoice-make">
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="2" class="invoice-make-block-title">
                购买方
              </el-col>
              <el-col :span="22" class="invoice-make-block-content">
                <el-form-item label="抬头类型：" prop="buyerType">
                  <el-radio-group size="small" v-model="invoiceMakeForm.buyerType">
                    <el-radio :label="2">单位</el-radio>
                    <el-radio :label="1">个人</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="名称：" prop="buyerName">
                  <el-input size="small" placeholder="请输入个人／企业名称" v-model.trim="invoiceMakeForm.buyerName"></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别号：" prop="buyerTaxCode" :class="{'is-required':invoiceMakeForm.buyerType === 2}">
                  <el-input size="small" placeholder="请输入纳税人识别号" v-model.trim="invoiceMakeForm.buyerTaxCode"></el-input>
                </el-form-item>
                <el-form-item label="地址、电话：">
                  <el-row>
                    <el-col :span="11">
                      <el-form-item label-width="0px" class="el-col-el-form-item" prop="buyerAddress">
                        <el-input size="small" placeholder="请输入地址"
                                  v-model.trim="invoiceMakeForm.buyerAddress"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="1">
                      <el-form-item label-width="0px" class="el-col-el-form-item" prop="buyerPhone">
                        <el-input size="small" placeholder="请输入电话" v-model.trim="invoiceMakeForm.buyerPhone"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="开户行及账号：">
                  <el-row>
                    <el-col :span="11">
                      <el-form-item label-width="0px" class="el-col-el-form-item" prop="buyerBankName">
                        <el-input size="small" placeholder="请输入开户行" v-model.trim="invoiceMakeForm.buyerBankName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="1">
                      <el-form-item label-width="0px" class="el-col-el-form-item" prop="buyerBankAccount">
                        <el-input size="small" placeholder="请输入账号" v-model.trim="invoiceMakeForm.buyerBankAccount"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
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
            <span class="el-form-item-require">*</span> 货物或应税劳务、服务名称
          </el-col>
          <el-col :span="2">
            规格型号
          </el-col>
          <el-col :span="1">
            单位
          </el-col>
          <el-col :span="3">
            <span class="el-form-item-require">*</span> 数量
          </el-col>
          <el-col :span="3">
            <span class="el-form-item-require">*</span> 单价（含税）
          </el-col>
          <el-col :span="3">
            <span class="el-form-item-require">*</span> 金额（含税）
          </el-col>
          <el-col :span="1">
            税率
          </el-col>
          <el-col :span="4">
            税额
          </el-col>
        </el-row>
        <el-row class="invoice-make-content text-center" v-for="(invoiceDetail, index) in invoiceMakeForm.invoiceDetails" :key="invoiceDetail.key">
          <el-col :span="1">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.key'">
              <el-checkbox size="small" v-model="invoiceDetailsKeys" :label="invoiceDetail.key">
                {{emptyStr}}
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.itemName'" v-if="invoiceDetail.invoiceLineProperty === '1'">
              <el-input size="small" v-model.trim="invoiceDetail.itemName" :readonly="true" icon="search" @click="handleGetInvoiceItem(index)"></el-input>
            </el-form-item>
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.itemName'" v-else>
              {{invoiceDetail.itemName}}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.imModels'">
              {{invoiceDetail.imModels}}
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.gfe02'">
              {{invoiceDetail.gfe02}}
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.quantity'" :rules="rules.quantity" v-if="invoiceDetail.invoiceLineProperty === '1'">
              <el-input size="small" v-model.number="invoiceDetail.quantity" @change="handleQuantityChange(invoiceDetail)"></el-input>
            </el-form-item>
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.quantity'" v-else>
              {{invoiceDetail.quantity}}
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.unitPrice'" :rules="rules.unitPrice" v-if="invoiceDetail.invoiceLineProperty === '1'">
              <el-input size="small" v-model.number="invoiceDetail.unitPrice" @change="handleUnitPriceChange(invoiceDetail)"></el-input>
            </el-form-item>
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.unitPrice'" v-else>
              {{invoiceDetail.unitPrice}}
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.totalPrice'" :rules="rules.totalPrice" v-if="invoiceDetail.invoiceLineProperty === '1'">
              <el-input size="small" v-model.number="invoiceDetail.totalPrice" @change="handleTotalPriceChange(invoiceDetail)"></el-input>
            </el-form-item>
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.totalPrice'" v-else>
              {{invoiceDetail.totalPrice}}
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.tax'">
              <template v-if="Boolean(invoiceDetail.tax)">
                {{invoiceDetail.tax}}%
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0px" :prop="'invoiceDetails.' + index + '.taxAmount'">
              {{invoiceDetail.taxAmount}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" class="invoice-make-content-total">
            <span class="invoice-make-content-total-title">合计</span>
          </el-col>
          <el-col :span="4" class="invoice-make-content-total">
            <span>¥：</span><span class="invoice-make-content-total-amount">{{totalAmount}}</span>
          </el-col>
          <el-col :span="4" class="invoice-make-content-total">
            <span>¥：</span><span class="invoice-make-content-total-amount">{{totalTaxAmount}}</span>
          </el-col>
        </el-row>
        <el-row class="invoice-make-content-bottom">
          <el-col :span="14" class="invoice-make-content-bottom-amount">
            <span>价税合计（大写）：</span>{{totalAmount | formatRMB}}
          </el-col>
          <el-col :span="10" class="invoice-make-content-bottom-amount">
            <span>（小写）：</span>{{totalAmount | formatCurrency}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="2" class="invoice-make-block-title invoice-make-block-title-xf">
                销售方
              </el-col>
              <el-col :span="22" class="invoice-make-block-content invoice-make-block-content-xf">
                <el-form-item label="名称：" prop="companyId">
                  <el-select size="small" placeholder="请选择销售方名称" v-model="invoiceMakeForm.companyId" filterable clearable @change="handleCompanyChange">
                    <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="纳税人识别号：">
                  {{company.taxCode}}
                </el-form-item>
                <el-form-item label="地址、电话：">
                  {{addressAndPhone}}
                </el-form-item>
                <el-form-item label="开户行及账号：">
                  {{bankNameAndbankAccount}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="2" class="invoice-make-block-title invoice-make-block-title-bz">
                备注
              </el-col>
              <el-col :span="22" class="invoice-make-block-content invoice-make-block-content-remark">
                <el-form-item label-width="0px" prop="invoiceRemark">
                  <el-input type="textarea" resize="none" v-model.trim="invoiceMakeForm.invoiceRemark" :rows="8"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="收款人：">
            {{company.payee}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="复核人：">
            {{company.reviewer}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开票人：">
            {{company.drawer}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售方（章）：">
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="invoice-make-bottom">
        <el-col :span="6">
          <el-form-item label="收票人邮箱：" prop="buyerEmail">
            <el-input size="small" placeholder="请输入收票人邮箱" v-model.trim="invoiceMakeForm.buyerEmail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门店名称：" prop="storeId">
            <el-select size="small" placeholder="请选择门店名称" v-model.trim="invoiceMakeForm.storeId" filterable clearable>
              <el-option v-for="item in storeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售单据号：" prop="ticketNum">
            <el-input size="small" placeholder="请输入销售单据号" v-model.trim="invoiceMakeForm.ticketNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="mt-20 text-center">
        <el-button type="primary" :loading="buttonLoading" @click.native.prevent="handleSaveInvoice('invoiceMakeForm')">开 票</el-button>
      </div>
    </el-form>

    <el-dialog title="选择商品信息" :visible.sync="invoiceItemDialogVisible" size="large">
      <el-form :inline="true" :model="invoiceItemSearchForm">
        <el-form-item label="商品名称">
          <el-input placeholder="请输入商品名称" v-model.trim="invoiceItemSearchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业商品编号">
          <el-input placeholder="请输入企业商品编号" v-model.trim="invoiceItemSearchForm.imId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="handleSearchInvoiceItem">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="invoiceItemLoading" :data="invoiceItemData" empty-text="暂无数据" @row-dblclick="handleSelectInvoiceItem">
        <el-table-column label="商品名称" prop="imName" align="center">
        </el-table-column>
        <el-table-column label="企业商品编号" prop="imId" align="center">
        </el-table-column>
        <el-table-column label="税收分类编码" prop="imInvclass" align="center">
        </el-table-column>
        <el-table-column label="税收分类名称" prop="imInvcname" align="center">
        </el-table-column>
        <el-table-column label="税率" prop="gec04" align="center" :formatter="gec04Filter">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button size="small" @click.native.prevent="handleSelectInvoiceItem(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-pagination :current-page.sync="invoiceItemPage.currentPage" :page-size="invoiceItemPage.pageSize"
                       :page-count="invoiceItemPage.pageCount" :total="invoiceItemPage.total" @current-change="getInvoiceItemData"
                       layout="prev, pager, next">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="商品折扣行信息" :visible.sync="invoiceDiscountItemDialogVisible" size="large" :before-close="handleInvoiceDiscountItemDialogCancel">
      <el-form :inline="true" :model="invoiceDiscountItemForm" :rules="invoiceDiscountItemFormRules" ref="invoiceDiscountItemForm" label-position="left" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="折扣行名称：">
              <el-input v-model="invoiceDetail.itemName" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="折扣率：" prop="discountTax">
              <el-input v-model.number="invoiceDiscountItemForm.discountTax" @change="handleDiscountTaxChange">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原商品金额：">
              <el-input v-model="invoiceDetail.totalPrice" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="折扣金额：" prop="discountAmount">
              <el-input v-model.number="invoiceDiscountItemForm.discountAmount" @change="handleDiscountAmountChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原商品税率：">
              <el-input v-model="invoiceDetail.tax" :readonly="true">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="折扣税额：">
              <el-input v-model="invoiceDiscountItemForm.discountTaxAmount" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleInvoiceDiscountItemDialogCancel">取 消</el-button>
        <el-button type="primary" @click.native.prevent="handleInvoiceDiscountItemDialogSave('invoiceDiscountItemForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import fetch from '@/config/fetch';
  import validate from '@/assets/js/validate';

  export default {
    data() {
      const validatorBuyerName = (rule, value, callback) => {
        if (validate.validateBuyerName(value)) {
          callback();
        } else {
          callback(new Error('个人／企业名称格式不对'));
        }
      };
      const validatorBuyerTaxCode = (rule, value, callback) => {
        if (this.invoiceMakeForm.buyerType === 2) {
          if (value === '') {
            callback(new Error('请输入纳税人识别号'));
          } else if (!validate.validateTaxCode(value)) {
            callback(new Error('纳税人识别号格式不对'));
          } else {
            callback();
          }
        } else {
          if (value !== '' && !validate.validateTaxCode(value)) {
            callback(new Error('纳税人识别号格式不对'));
          } else {
            callback();
          }
        }
      };
      const validatorBuyerAddress = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validateAddress(value)) {
            callback();
          } else {
            callback(new Error('地址格式不对'));
          }
        } else {
          callback();
        }
      };
      const validatorBuyerPhone = (rule, value, callback) => {
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
      const validatorBuyerBankName = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validateBankName(value)) {
            callback();
          } else {
            callback(new Error('开户行格式不对'));
          }
        } else {
          callback();
        }
      };
      const validatorBuyerBankAccount = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validateBankAccount(value)) {
            callback();
          } else {
            callback(new Error('账号格式不对'));
          }
        } else {
          callback();
        }
      };
      const validatorQuantity = (rule, value, callback) => {
        if (validate.validateQuantity(value)) {
          callback();
        } else {
          callback(new Error('数量格式不对'));
        }
      };
      const validatorUnitPrice = (rule, value, callback) => {
        if (validate.validateUnitPrice(value)) {
          callback();
        } else {
          callback(new Error('单价格式不对'));
        }
      };
      const validatorTotalPrice = (rule, value, callback) => {
        if (validate.validateTotalPrice(value)) {
          callback();
        } else {
          callback(new Error('金额格式不对'));
        }
      };
      const validatorBuyerInvoiceRemark = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validateInvoiceRemark(value)) {
            callback();
          } else {
            callback(new Error('备注格式不对'));
          }
        } else {
          callback();
        }
      };
      const validatorBuyerEmail = (rule, value, callback) => {
        if (Boolean(value)) {
          if (validate.validateEmail(value) && value.length <= 50) {
            callback();
          } else {
            callback(new Error('收票人邮箱格式不对'));
          }
        } else {
          callback();
        }
      };
      const validatorTicketNum = (rule, value, callback) => {
        if (validate.validateTicketNum(value)) {
          callback();
        } else {
          callback(new Error('销售单据号格式不对'));
        }
      };
      const validatorDiscountTax = (rule, value, callback) => {
        if (validate.validateTax(value)) {
          callback();
        } else {
          callback(new Error('折扣率格式不对'));
        }
      };
      const validatorDiscountAmount = (rule, value, callback) => {
        if (validate.validateTotalPrice(value)) {
          if (value > this.invoiceDetail.totalPrice) {
            callback(new Error('折扣金额不能大于原商品金额'));
          } else {
            callback();
          }
        } else {
          callback(new Error('折扣金额格式不对'));
        }
      };
      return {
        buttonLoading: false,
        invoiceMakeForm: {
          buyerType: 2,
          buyerName: '',
          buyerTaxCode: '',
          buyerAddress: '',
          buyerPhone: '',
          buyerBankName: '',
          buyerBankAccount: '',
          companyId: '',
          invoiceTotalAmount: '',
          invoiceAmount: '',
          invoiceTaxAmount: '',
          invoiceRemark: '',
          buyerEmail: '',
          storeId: '',
          ticketNum: '',
          invoiceDetails: [{
            key: Date.now(),
            itemId: '',
            itemName: '',
            imModels: '',
            gfe02: '',
            quantity: '',
            unitPrice: '',
            totalPrice: '',
            tax: '',
            taxAmount: '',
            invoiceLineProperty: '1',
            originalKey: ''
          }]
        },
        rules: {
          buyerName: [
            {required: true, message: '请输入个人／企业名称', trigger: 'blur'},
            {validator: validatorBuyerName, trigger: 'blur'}
          ],
          buyerTaxCode: [
            {validator: validatorBuyerTaxCode, trigger: 'blur'}
          ],
          buyerAddress: [
            {validator: validatorBuyerAddress, trigger: 'blur'}
          ],
          buyerPhone: [
            {validator: validatorBuyerPhone, trigger: 'blur'}
          ],
          buyerBankName: [
            {validator: validatorBuyerBankName, trigger: 'blur'}
          ],
          buyerBankAccount: [
            {validator: validatorBuyerBankAccount, trigger: 'blur'}
          ],
          quantity: [
            {required: true, message: '请输入数量'},
            {type: 'number', message: '数量必须为数字值'},
            {validator: validatorQuantity}
          ],
          unitPrice: [
            {required: true, message: '请输入单价'},
            {type: 'number', message: '单价必须为数字值'},
            {validator: validatorUnitPrice}
          ],
          totalPrice: [
            {required: true, message: '请输入金额'},
            {type: 'number', message: '金额必须为数字值'},
            {validator: validatorTotalPrice}
          ],
          invoiceRemark: [
            {validator: validatorBuyerInvoiceRemark, trigger: 'blur'}
          ],
          companyId: [
            {required: true, message: '请选择销售方名称', trigger: 'change'}
          ],
          buyerEmail: [
            {validator: validatorBuyerEmail, trigger: 'blur'}
          ],
          storeId: [
            {required: true, message: '请选择门店名称', trigger: 'change'}
          ],
          ticketNum: [
            {required: true, message: '请输入销售单据号', trigger: 'blur'},
            {validator: validatorTicketNum, trigger: 'blur'}
          ]
        },
        invoiceDetailIndex: '',
        invoiceDetail: {},
        invoiceDetailsKeys: [],
        invoiceItemDialogVisible: false,
        invoiceItemLoading: true,
        invoiceItemSearchForm: {
          name: '',
          imId: ''
        },
        invoiceItemPage: {
          currentPage: 1,
          pageSize: 8,
          total: 0,
          pageCount: 0
        },
        invoiceItemData: [],
        invoiceDiscountItemDialogVisible: false,
        invoiceDiscountItemForm: {
          discountTax: '',
          discountAmount: '',
          discountTaxAmount: ''
        },
        invoiceDiscountItemFormRules: {
          discountTax: [
            {required: true, message: '请输入折扣率'},
            {type: 'number', message: '折扣率必须为数字值'},
            {validator: validatorDiscountTax}
          ],
          discountAmount: [
            {required: true, message: '请输入折扣金额'},
            {type: 'number', message: '折扣金额必须为数字值'},
            {validator: validatorDiscountAmount}
          ]
        },
        companyList: [],
        company: {},
        storeList: []
      };
    },
    watch: {
      company({id}){
        this.storeList = [];
        this.invoiceMakeForm.storeId = '';
        if (Boolean(id)) {
          fetch.get('/invoice/getAvailableStore/' + id).then(({data}) => {
            this.storeList = data;
          }).catch(() => {
          });
        }
      }
    },
    methods: {
      initPageData(){
        this.$set(this.$data, 'invoiceMakeForm', {
          buyerType: 2,
          buyerName: '',
          buyerTaxCode: '',
          buyerAddress: '',
          buyerPhone: '',
          buyerBankName: '',
          buyerBankAccount: '',
          companyId: '',
          invoiceTotalAmount: '',
          invoiceAmount: '',
          invoiceTaxAmount: '',
          invoiceRemark: '',
          buyerEmail: '',
          storeId: '',
          ticketNum: '',
          invoiceDetails: [{
            key: Date.now(),
            itemId: '',
            itemName: '',
            imModels: '',
            gfe02: '',
            quantity: '',
            unitPrice: '',
            totalPrice: '',
            tax: '',
            taxAmount: '',
            invoiceLineProperty: '1',
            originalKey: ''
          }]
        });
        this.$set(this.$data, 'company', {});
        this.$set(this.$data, 'invoiceDetailsKeys', []);
      },
      handleAddInvoiceItem() {
        this.invoiceMakeForm.invoiceDetails.push({
          key: Date.now(),
          itemId: '',
          itemName: '',
          imModels: '',
          gfe02: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          tax: '',
          taxAmount: '',
          invoiceLineProperty: '1',
          originalKey: ''
        });
      },
      handleGetInvoiceItem(index) {
        this.invoiceDetailIndex = index;
        this.invoiceItemDialogVisible = true;
        this.invoiceItemSearchForm.name = '';
        this.invoiceItemSearchForm.imId = '';
        this.handleSearchInvoiceItem();
      },
      handleSearchInvoiceItem() {
        this.invoiceItemPage.currentPage = 1;
        this.invoiceItemPage.pageSize = 8;
        this.invoiceItemPage.total = 0;
        this.invoiceItemPage.pageCount = 0;
        this.getInvoiceItemData();
      },
      getInvoiceItemData() {
        this.invoiceItemLoading = true;
        fetch.get('/invoice/getItems', {
          params: {
            name: this.invoiceItemSearchForm.name,
            imId: this.invoiceItemSearchForm.imId,
            pageIndex: this.invoiceItemPage.currentPage,
            pageSize: this.invoiceItemPage.pageSize
          }
        }).then(({data}) => {
          this.invoiceItemLoading = false;
          this.invoiceItemPage.total = data.totalCount;
          this.invoiceItemPage.pageCount = data.totalPageCount;
          this.invoiceItemData = data.result;
        }).catch(() => {
          this.invoiceItemLoading = false;
        });
      },
      handleSelectInvoiceItem(row) {
        this.$set(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex], 'itemId', row.imId);
        this.$set(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex], 'itemName', row.imName);
        this.$set(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex], 'imModels', row.imModels);
        this.$set(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex], 'gfe02', row.gfe02);
        this.$set(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex], 'tax', row.gec04);
        if (Boolean(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex].totalPrice)) {
          var taxAmount = (this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex].totalPrice / (1 + row.gec04 / 100)) * row.gec04 / 100;
          taxAmount = Number.parseFloat(taxAmount).toFixed(2);
          this.$set(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex], 'taxAmount', taxAmount);
        }
        this.invoiceItemDialogVisible = false;
      },
      gec04Filter({gec04}) {
        return gec04 + '%';
      },
      handleQuantityChange(invoiceDetail) {
        if (validate.validateQuantity(invoiceDetail.quantity)) {
          if (!Boolean(invoiceDetail.unitPrice) && validate.validateTotalPrice(invoiceDetail.totalPrice)) {
            invoiceDetail.unitPrice = invoiceDetail.totalPrice / invoiceDetail.quantity;
            invoiceDetail.unitPrice = Number(Number.parseFloat(invoiceDetail.unitPrice).toFixed(8));
          }
          if (validate.validateUnitPrice(invoiceDetail.unitPrice)) {
            invoiceDetail.totalPrice = invoiceDetail.quantity * invoiceDetail.unitPrice;
            invoiceDetail.totalPrice = Number(Number.parseFloat(invoiceDetail.totalPrice).toFixed(2));
            if (Boolean(invoiceDetail.tax)) {
              invoiceDetail.taxAmount = (invoiceDetail.quantity * invoiceDetail.unitPrice / (1 + invoiceDetail.tax / 100)) * invoiceDetail.tax / 100;
              invoiceDetail.taxAmount = Number.parseFloat(invoiceDetail.taxAmount).toFixed(2);
            }
          }
        }
      },
      handleUnitPriceChange(invoiceDetail) {
        if (validate.validateUnitPrice(invoiceDetail.unitPrice)) {
          if (!Boolean(invoiceDetail.quantity) && validate.validateTotalPrice(invoiceDetail.totalPrice)) {
            invoiceDetail.quantity = invoiceDetail.totalPrice / invoiceDetail.unitPrice;
            invoiceDetail.quantity = Number(Number.parseFloat(invoiceDetail.quantity).toFixed(8));
          }
          if (validate.validateQuantity(invoiceDetail.quantity)) {
            invoiceDetail.totalPrice = invoiceDetail.quantity * invoiceDetail.unitPrice;
            invoiceDetail.totalPrice = Number(Number.parseFloat(invoiceDetail.totalPrice).toFixed(2));
            if (Boolean(invoiceDetail.tax)) {
              invoiceDetail.taxAmount = (invoiceDetail.quantity * invoiceDetail.unitPrice / (1 + invoiceDetail.tax / 100)) * invoiceDetail.tax / 100;
              invoiceDetail.taxAmount = Number.parseFloat(invoiceDetail.taxAmount).toFixed(2);
            }
          }
        }
      },
      handleTotalPriceChange(invoiceDetail) {
        if (validate.validateTotalPrice(invoiceDetail.totalPrice)) {
          if (!Boolean(invoiceDetail.quantity) && validate.validateUnitPrice(invoiceDetail.unitPrice)) {
            invoiceDetail.quantity = invoiceDetail.totalPrice / invoiceDetail.unitPrice;
            invoiceDetail.quantity = Number(Number.parseFloat(invoiceDetail.quantity).toFixed(8));
          }
          if (validate.validateQuantity(invoiceDetail.quantity)) {
            invoiceDetail.unitPrice = invoiceDetail.totalPrice / invoiceDetail.quantity;
            invoiceDetail.unitPrice = Number(Number.parseFloat(invoiceDetail.unitPrice).toFixed(8));
          }
        }
        if (Boolean(invoiceDetail.totalPrice)) {
          if (Boolean(invoiceDetail.tax)) {
            invoiceDetail.taxAmount = (invoiceDetail.totalPrice / (1 + invoiceDetail.tax / 100)) * invoiceDetail.tax / 100;
            invoiceDetail.taxAmount = Number.parseFloat(invoiceDetail.taxAmount).toFixed(2);
          }
        } else {
          invoiceDetail.taxAmount = '';
        }
      },
      handleAddInvoiceDiscountItem() {
        if (this.invoiceDetailsKeys.length === 0) {
          this.$message('请选择需要打折的商品');
          return false;
        } else if (this.invoiceDetailsKeys.length > 1) {
          this.$message('只能选择一条商品');
          return false;
        } else {
          this.invoiceDetailIndex = _.findIndex(this.invoiceMakeForm.invoiceDetails, {'key': this.invoiceDetailsKeys[0]});
          var {itemId, totalPrice, tax, invoiceLineProperty} = this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex];
          if (!Boolean(itemId) || !validate.validateTotalPrice(totalPrice) || tax === '') {
            this.$message('请先完善该商品信息');
            return false;
          }
          if (invoiceLineProperty === '2' || invoiceLineProperty === '3') {
            var msg = invoiceLineProperty === '2' ? '该商品已打折' : '只能对商品行打折';
            this.$message(msg);
            return false;
          }
          this.invoiceDetail = this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex];
          this.invoiceDiscountItemDialogVisible = true;
        }
      },
      handleDiscountTaxChange() {
        if (validate.validateTax(this.invoiceDiscountItemForm.discountTax)) {
          this.invoiceDiscountItemForm.discountAmount = this.invoiceDetail.totalPrice * this.invoiceDiscountItemForm.discountTax / 100;
          this.invoiceDiscountItemForm.discountAmount = Number(Number.parseFloat(this.invoiceDiscountItemForm.discountAmount).toFixed(2));
          this.invoiceDiscountItemForm.discountTaxAmount = ((this.invoiceDetail.totalPrice * this.invoiceDiscountItemForm.discountTax / 100) / (1+ this.invoiceDetail.tax / 100)) * this.invoiceDetail.tax / 100;
          this.invoiceDiscountItemForm.discountTaxAmount = Number(Number.parseFloat(this.invoiceDiscountItemForm.discountTaxAmount).toFixed(2));
        }
      },
      handleDiscountAmountChange() {
        if (validate.validateTotalPrice(this.invoiceDiscountItemForm.discountAmount)) {
          this.invoiceDiscountItemForm.discountTax = this.invoiceDiscountItemForm.discountAmount / this.invoiceDetail.totalPrice * 100;
          this.invoiceDiscountItemForm.discountTax = Number(Number.parseFloat(this.invoiceDiscountItemForm.discountTax).toFixed(3));
          this.invoiceDiscountItemForm.discountTaxAmount = (this.invoiceDiscountItemForm.discountAmount / (1+ this.invoiceDetail.tax / 100)) * this.invoiceDetail.tax / 100;
          this.invoiceDiscountItemForm.discountTaxAmount = Number(Number.parseFloat(this.invoiceDiscountItemForm.discountTaxAmount).toFixed(2));
        }
      },
      handleInvoiceDiscountItemDialogCancel(done) {
        this.$refs['invoiceDiscountItemForm'].resetFields();
        if (Boolean(done)) {
          done();
        } else {
          this.invoiceDiscountItemDialogVisible = false;
        }
      },
      handleInvoiceDiscountItemDialogSave(invoiceDiscountItemForm) {
        this.$refs[invoiceDiscountItemForm].validate((valid) => {
          if (valid) {
            this.$set(this.invoiceMakeForm.invoiceDetails[this.invoiceDetailIndex], 'invoiceLineProperty', '2');
            this.invoiceMakeForm.invoiceDetails.splice(this.invoiceDetailIndex + 1, 0, {
              key: Date.now(),
              itemId: this.invoiceDetail.itemId,
              itemName: this.invoiceDetail.itemName,
              imModels: '',
              gfe02: '',
              quantity: '',
              unitPrice: '',
              totalPrice: -this.invoiceDiscountItemForm.discountAmount,
              tax: this.invoiceDetail.tax,
              taxAmount: -this.invoiceDiscountItemForm.discountTaxAmount,
              invoiceLineProperty: '3',
              originalKey: this.invoiceDetail.key
            });
            this.$refs['invoiceDiscountItemForm'].resetFields();
            this.invoiceDiscountItemDialogVisible = false;
          } else {
            return false;
          }
        });
      },
      handleDeleteInvoiceItem() {
        if (this.invoiceDetailsKeys.length > 0) {
          var temp = Object.assign([], this.invoiceDetailsKeys);
          temp.forEach(e => {
            var index = _.findIndex(this.invoiceMakeForm.invoiceDetails, {'key': e});
            var {key, invoiceLineProperty, originalKey} = this.invoiceMakeForm.invoiceDetails[index];
            if (invoiceLineProperty === '1') {
              this.invoiceMakeForm.invoiceDetails.splice(index, 1);
            }
            if (invoiceLineProperty === '2') {
              var invoiceItemIndex = _.findIndex(this.invoiceMakeForm.invoiceDetails, {'originalKey': key});
              this.invoiceMakeForm.invoiceDetails.splice(invoiceItemIndex, 1);
              this.invoiceMakeForm.invoiceDetails.splice(index, 1);
            }
            if (invoiceLineProperty === '3') {
              var invoiceDiscountItemIndex = _.findIndex(this.invoiceMakeForm.invoiceDetails, {'key': originalKey});
              this.$set(this.invoiceMakeForm.invoiceDetails[invoiceDiscountItemIndex], 'invoiceLineProperty', '1');
              this.invoiceMakeForm.invoiceDetails.splice(index, 1);
            }
          });
          this.invoiceDetailsKeys = [];
        }
      },
      handleCompanyChange(companyId) {
        if (Boolean(companyId)) {
          this.company = _.find(this.companyList, {id: companyId});
        } else {
          this.company = {};
        }
      },
      handleSaveInvoice(invoiceMakeForm) {
        this.$refs[invoiceMakeForm].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            fetch.post('/invoice/invoiceBlue', this.invoiceMakeForm).then(({msg}) => {
              this.buttonLoading = false;
              this.$message({
                type: 'success',
                message: msg
              });
              this.initPageData();
              this.$refs[invoiceMakeForm].resetFields();
            }).catch(({msg}) => {
              this.buttonLoading = false;
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
    },
    computed: {
      emptyStr() {
        return '';
      },
      totalAmount() {
        var totalAmount = this.invoiceMakeForm.invoiceDetails.filter(e => {
          return Boolean(e.totalPrice);
        }).map(e => {
          return e.totalPrice;
        }).reduce((sum, value) => {
          return sum + value;
        }, 0);
        totalAmount = totalAmount !== 0 ? Number.parseFloat(totalAmount).toFixed(2) : '';
        this.invoiceMakeForm.invoiceTotalAmount = totalAmount;
        this.invoiceMakeForm.invoiceAmount = totalAmount;
        return totalAmount !== 0 ? totalAmount : '';
      },
      totalTaxAmount() {
        var totalTaxAmount = this.invoiceMakeForm.invoiceDetails.filter(e => {
          return Boolean(e.taxAmount);
        }).map(e => {
          return e.taxAmount;
        }).reduce((sum, value) => {
          return sum + Number(value);
        }, 0);
        totalTaxAmount = totalTaxAmount !== 0 ? Number.parseFloat(totalTaxAmount).toFixed(2) : '';
        this.invoiceMakeForm.invoiceTaxAmount = totalTaxAmount;
        return totalTaxAmount !== 0 ? totalTaxAmount : '';
      },
      addressAndPhone() {
        if (Boolean(this.company.address) && Boolean(this.company.phone)) {
          return this.company.address + '、' + this.company.phone;
        } else if (Boolean(this.company.address) && !Boolean(this.company.phone)) {
          return this.company.address;
        } else if (!Boolean(this.company.address) && Boolean(this.company.phone)) {
          this.company.phone;
        } else {
          return '';
        }
      },
      bankNameAndbankAccount() {
        if (Boolean(this.company.bankName) && Boolean(this.company.bankAccount)) {
          return this.company.bankName + '、' + this.company.bankAccount;
        } else if (Boolean(this.company.bankName) && !Boolean(this.company.bankAccount)) {
          return this.company.bankName;
        } else if (!Boolean(this.company.bankName) && Boolean(this.company.bankAccount)) {
          this.company.bankAccount;
        } else {
          return '';
        }
      }
    },
    mounted() {
      fetch.get('/invoice/getAvailableCompany').then(({data}) => {
        this.companyList = data;
      }).catch(() => {
      });
    }
  }
</script>

<style scoped>
  .main-content-title {
    border-bottom: none;
  }

  .main-content-title-button {
    display: inline-block;
    float: right;
  }

  .invoice-make {
    border: 1px solid #bce8f1;
  }

  .invoice-make-block-title {
    padding: 96px 12px;
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

  .invoice-make-content-total .invoice-make-content-total-amount {
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

  .invoice-make-block-title-xf {
    padding: 69px 12px;
  }

  .invoice-make-block-content-xf .el-select {
    width: 100%;
  }

  .invoice-make-block-title-bz {
    padding: 81px 12px;
    border-left: 1px solid #bce8f1;
  }

  .invoice-make-block-content-remark {
    margin-top: 2%;
  }

</style>
