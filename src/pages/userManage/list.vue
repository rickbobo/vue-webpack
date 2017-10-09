<template>
  <div class="right-container">
    <div class="manage-header">
      <router-link to="/manage/userManageAdd">
        <el-button type="primary">新 增</el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column label="用户名" prop="userName" align="center">
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <router-link :to="'/manage/userManageModify/' + scope.row.id">
            <el-button size="small">修改</el-button>
          </router-link>
          <el-button size="small" @click.native.prevent="handleRuleModify(scope.row)">公司权限分配</el-button>
          <el-button size="small" :type="scope.row.status === true ? 'danger' : 'info'" @click.native.prevent="handleStatusModify(scope.$index, scope.row)" v-text="scope.row.status === true ? '禁用' : '启用'"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination :current-page.sync="page.currentPage" :page-size="page.pageSize"
                     :page-count="page.pageCount" :total="page.total" @current-change="handleCurrentPageChange"
                     layout="prev, pager, next">
      </el-pagination>
    </div>
    <el-dialog title="公司权限分配" :visible.sync="ruleDialogVisible" size="tiny">
      <div class="tree-box scrollbar">
        <el-tree ref="ruleTree" :data="ruleData" show-checkbox check-strictly accordion node-key="key" :default-checked-keys="defaultRule" :default-expanded-keys="defaultRule" empty-text="暂无数据" @check-change="handleRuleTreeChange">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="buttonLoading" @click.native.prevent="handleRuleSave('ruleTree')">保 存</el-button>
        <el-button @click.native.prevent="handleRuleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {pageData} from '@/config/mixin';
  import fetch from '@/config/fetch';

  export default {
    mixins: [pageData],
    data() {
      return {
        buttonLoading: false,
        ruleDialogVisible: false,
        ruleData: [],
        defaultRule: [],
        userId: ''
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/user/getAll', {
          params: {
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
      handleRuleModify(row) {
        fetch.all([fetch.get('/user/availableCompanyStore'), fetch.get('/user/getCompanyStore/' + row.id)]).then(fetch.spread((acct, perms) => {
          this.$set(this.$data, 'ruleData', acct.data);
          this.$set(this.$data, 'defaultRule', perms.data);
          this.userId = row.id;
          this.ruleDialogVisible = true;
        })).catch(() => {
          this.$message({
            type: 'error',
            message: '数据获取失败'
          });
        });
      },
      handleRuleTreeChange({key}, selfChecked) {
        if (selfChecked) {
          var isCompany = this.ruleData.some(e => {
            return e.key === key;
          });
          if (!isCompany) {
            this.$refs['ruleTree'].setCheckedKeys([key]);
          }
        }
      },
      handleRuleSave(ruleTree) {
        this.buttonLoading = true;
        fetch.post('/user/saveCompanyStore', {
          id: this.userId,
          keys: this.$refs[ruleTree].getCheckedKeys()
        }).then(({msg}) => {
          this.buttonLoading = false;
          this.$message({
            type: 'success',
            message: msg
          });
          this.ruleDialogVisible = false;
        }).catch(({msg}) => {
          this.buttonLoading = false;
          this.$message({
            type: 'error',
            message: msg
          });
          this.ruleDialogVisible = false;
        });
      },
      handleRuleCancel() {
        this.buttonLoading = false;
        this.ruleDialogVisible = false;
      },
      handleStatusModify(index, row) {
        var message = row.status === true ? '禁用后，该用户将不能登录系统，确定要禁用？' : '启用后，该用户将正常登录系统，确定要启用？';
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetch.post('/user/forbid/' + row.id).then(({msg}) => {
            this.$message({
              type: 'success',
              message: msg
            });
            this.$set(this.pageData[index], 'status', !row.status);
          }).catch(({msg}) => {
            this.$message({
              type: 'error',
              message: msg
            });
          });
        }).catch(() => {
        });
      }
    }
  }
</script>

<style scoped>
  .tree-box {
    height: 250px;
    overflow: auto;
    border: 1px solid #d1dbe5;
    border: 1px solid #d1dbe5
  }

  .el-tree {
    border: none
  }
</style>
