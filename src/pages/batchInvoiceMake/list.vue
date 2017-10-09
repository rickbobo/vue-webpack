<template>
  <div class="right-container">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="文件名称">
        <el-input placeholder="请输入公司名称" v-model.trim="searchForm.fileName"></el-input>
      </el-form-item>
      <el-form-item label="上传日期">
        <el-date-picker placeholder="请选择上传日期" v-model="searchForm.uploadTime" type="daterange"
                        :picker-options="pickerOptions" format="yyyy-MM-dd" :editable="false" clearable
                        @change="handleUploadTimeChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select placeholder="请选择处理状态" v-model="searchForm.state" clearable>
          <el-option label="待处理" value="0"></el-option>
          <el-option label="处理中" value="1"></el-option>
          <el-option label="处理成功" value="2"></el-option>
          <el-option label="处理失败" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作人">
        <el-select placeholder="请选择操作人" v-model="searchForm.createUserId" filterable clearable>
          <el-option v-for="item in userList" :key="item.id" :label="item.userName"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="getPageData">查 询</el-button>
        <el-button @click.native.prevent="handleUpload">上 传</el-button>
      </el-form-item>
    </el-form>
    <div class="manage-header">
      <a href="/static/excel/template.xlsx" download="template.xlsx">
        <el-button type="primary">下载导入模版</el-button>
      </a>
    </div>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column label="文件名称" prop="fileName" align="center">
      </el-table-column>
      <el-table-column label="上传时间" prop="uploadTime" align="center">
      </el-table-column>
      <el-table-column label="操作人" prop="operator" align="center">
      </el-table-column>
      <el-table-column label="处理状态" align="center">
        <template scope="scope">
          <el-tag type="primary" v-if="scope.row.state === 0">待处理</el-tag>
          <el-tag type="warning" v-if="scope.row.state === 1">处理中</el-tag>
          <el-tag type="gray" v-if="scope.row.state === 2">处理成功</el-tag>
          <el-popover trigger="hover" placement="top">
            <p>失败原因: {{scope.row.reason}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="danger" v-if="scope.row.state === 3">处理失败</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template scope="scope">
          <router-link :to="'/invoice/batchInvoiceMakeDetail/' + scope.row.id">
            <el-button size="small">查看处理详情</el-button>
          </router-link>
          <el-button size="small" @click.native.prevent="handleDownload(scope.row.id)">下载文件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination :current-page.sync="page.currentPage" :page-size="page.pageSize"
                     :page-count="page.pageCount" :total="page.total" @current-change="handleCurrentPageChange"
                     layout="prev, pager, next">
      </el-pagination>
    </div>
    <el-dialog title="上传模版" :visible.sync="uploadDialogVisible" size="tiny">
      <el-form :model="uploadForm" :rules="rules" ref="uploadForm" label-position="left" label-width="110px"
               class="upload-form">
        <el-form-item label="开票公司" prop="companyId">
          <el-select placeholder="请选择开票公司" v-model="uploadForm.companyId" filterable>
            <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批量开票模版" prop="fileName">
          <el-input placeholder="请上传模版文件" v-model="uploadForm.fileName" :readonly="true" icon="delete2"
                    :on-icon-click="handleUploadDelete"></el-input>
          <el-upload ref="upload" action="/duck/invoiceBatch/uploadFile" :data="{companyId: uploadForm.companyId}"
                     :multiple="false"
                     :show-file-list="false" :auto-upload="false" :on-change="handleUploadChange"
                     :on-success="handleUploadSuccess" :on-error="handleUploadError"
                     class="el-upload-button">
            <el-button type="primary" slot="trigger">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="uploadLoading" @click.native.prevent="handleUploadSave('uploadForm')">确 定
        </el-button>
        <el-button @click.native.prevent="handleUploadCancel('uploadForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {pageData, dateTimePickerOption, elSelectWidth, elDateEditorWidth} from '@/config/mixin';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';

  export default {
    mixins: [pageData, dateTimePickerOption, elSelectWidth, elDateEditorWidth],
    data() {
      return {
        searchForm: {
          fileName: '',
          uploadTime: '',
          beginTime: '',
          endTime: '',
          createUserId: '',
          state: '',
        },
        uploadLoading: false,
        uploadDialogVisible: false,
        uploadForm: {
          companyId: '',
          fileName: ''
        },
        rules: {
          companyId: [
            {required: true, message: '请选择开票公司', trigger: 'change'}
          ],
          fileName: [
            {required: true, message: '请上传模版文件', trigger: 'change'}
          ]
        },
        companyList: [],
        userList: []
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/invoiceBatch/getAll', {
          params: {
            fileName: this.searchForm.fileName,
            beginTime: this.searchForm.beginTime,
            endTime: this.searchForm.endTime,
            createUserId: this.searchForm.createUserId,
            state: this.searchForm.state,
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
      handleUploadTimeChange(uploadTime) {
        if (Boolean(uploadTime)) {
          var [beginTime, endTime] = uploadTime.split(' - ');
          this.searchForm.beginTime = beginTime;
          this.searchForm.endTime = endTime;
        } else {
          this.searchForm.beginTime = '';
          this.searchForm.endTime = '';
        }
      },
      handleUpload() {
        this.uploadDialogVisible = true;
      },
      handleUploadChange({name, size, status}) {
        if (status === 'ready') {
          var isXLSX = name.endsWith('.xlsx');
          var isChineseName = util.isContainChinese(name);
          var isLt2M = size / 1024 / 1024 < 5;
          if (!isXLSX) {
            this.$message('请上传正确格式的模版文件');
            return;
          }
          if (isChineseName) {
            this.$message('模版文件名称不能含有中文字符');
            return;
          }
          if (!isLt2M) {
            this.$message('上传模版文件大小不能超过5MB');
            return;
          }
          this.uploadForm.fileName = name;
        }
      },
      handleUploadDelete() {
        this.uploadForm.fileName = '';
        this.$refs['upload'].uploadFiles = [];
      },
      handleUploadSave(uploadForm) {
        this.$refs[uploadForm].validate((valid) => {
          if (valid) {
            this.uploadLoading = true;
            this.$refs['upload'].submit();
          } else {
            return false;
          }
        });
      },
      handleUploadCancel(uploadForm) {
        this.uploadLoading = false;
        this.$refs[uploadForm].resetFields();
        this.uploadDialogVisible = false;
      },
      handleUploadSuccess({code, msg}) {
        this.uploadLoading = false;
        var type = code === '200' ? 'success' : 'error';
        this.$message({
          type: type,
          message: msg
        });
        this.$refs['uploadForm'].resetFields();
        this.uploadDialogVisible = false;
        this.getPageData();
      },
      handleUploadError() {
        this.uploadLoading = false;
        this.$message({
          type: 'error',
          message: '上传失败，请稍后重试'
        });
      },
      handleDownload(id) {
        fetch.get('/loginStatus').then(() => {
          var url = '/duck/invoiceBatch/downloadFile/' + id;
          util.downloadFile(url);
        }).catch(() => {
        });
      }
    },
    mounted() {
      fetch.get('/invoiceBatch/getAvailableCompany').then(({data}) => {
        this.companyList = data;
      }).catch(() => {
      });
      fetch.get('/invoiceBatch/getOperators').then(({data}) => {
        this.userList = data;
      }).catch(() => {
      });
    }
  };
</script>

<style scoped>
  .upload-form .el-select {
    width: 75%;
  }

  .upload-form .el-input {
    width: 75%;
  }

  .upload-form .el-upload-button {
    display: inline-block;
    width: 20%;
    margin-left: 5px;
  }
</style>
