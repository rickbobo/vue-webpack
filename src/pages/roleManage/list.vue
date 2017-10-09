<template>
  <div class="right-container">
    <div class="manage-header">
      <router-link to="/manage/roleManageAdd">
        <el-button type="primary">新 增</el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column label="角色编号" prop="roleNum" align="center">
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <router-link :to="'/manage/roleManageModify/' + scope.row.id">
            <el-button size="small">修改</el-button>
          </router-link>
          <el-button size="small" @click.native.prevent="handleRoleModify(scope.row)">角色权限分配</el-button>
          <el-button size="small" type="danger" @click.native.prevent="handleDelete(scope.$index, scope.row)" :disabled="scope.row.used === true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block paging">
      <el-pagination :current-page.sync="page.currentPage" :page-size="page.pageSize"
                     :page-count="page.pageCount" :total="page.total" @current-change="handleCurrentPageChange"
                     layout="prev, pager, next">
      </el-pagination>
    </div>
    <el-dialog title="角色权限分配" :visible.sync="roleDialogVisible" size="tiny">
      <div class="tree-box scrollbar">
        <el-tree ref="roleTree" :data="roleData" show-checkbox node-key="key" :default-checked-keys="defaultRole" :default-expanded-keys="defaultRole" empty-text="暂无数据">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="buttonLoading" @click.native.prevent="handleRoleSave('roleTree')">保 存</el-button>
        <el-button @click.native.prevent="handleRoleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {pageData} from '@/config/mixin';
  import {asyncRouter} from '@/config/router';
  import fetch from '@/config/fetch';
  import util from '@/assets/js/util';

  export default {
    mixins: [pageData],
    data() {
      return {
        buttonLoading: false,
        roleDialogVisible: false,
        roleData: [],
        defaultRole: [],
        roleId: ''
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/role/getAll', {
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
      handleRoleModify(row) {
        function hasRole(roles, {meta, hidden}) {
          if (!hidden) {
            var {key} = meta;
            return roles.includes(key);
          } else {
            return false;
          }
        }
        function handleRoleData(asyncRouter, roles) {
          var result = [];
          asyncRouter.forEach(e => {
            if (hasRole(roles, e)) {
              var {key} = e.meta;
              var temp = {};
              temp.key = key;
              temp.label = e.name;
              if (Boolean(e.children)) {
                temp.children = handleRoleData(e.children, roles);
              }
              result.push(temp);
            }
          });
          return result;
        }
        function handleDefaultRole(asyncRouter, defaultRole) {
          var keys = asyncRouter.map(({meta}) => {
            var {auth, key} = meta;
            if(auth === true){
              return key;
            }
          }).filter(e => {
            return Boolean(e);
          });
          return defaultRole.filter(e => {
            return !keys.includes(e);
          });
        }
        fetch.all([fetch.get('/role/availableAuthority'), fetch.get('/role/getRoleAuthority/' + row.id)]).then(fetch.spread((acct, perms) => {
          this.$set(this.$data, 'roleData', handleRoleData(asyncRouter, acct.data));
          this.$set(this.$data, 'defaultRole', handleDefaultRole(asyncRouter, perms.data));
          this.roleId = row.id;
          this.roleDialogVisible = true;
        })).catch(() => {
          this.$message({
            type: 'error',
            message: '数据获取失败'
          });
        });
      },
      handleRoleSave(roleTree) {
        this.buttonLoading = true;
        var checkedRole = this.$refs[roleTree].getCheckedKeys();
        if (checkedRole.length > 0) {
          function handleCheckedRole(roleData, checkedRole) {
            var result = [];
            roleData.forEach(e => {
              if (checkedRole.includes(e.key)) {
                result.push(e.key);
                if (Boolean(e.children)) {
                  e.children.filter(item => {
                    return checkedRole.includes(item.key);
                  }).forEach(children => {
                    result.push(children.key);
                  });
                }
              } else {
                if (Boolean(e.children)) {
                  var childrenResult = e.children.filter(item => {
                    return checkedRole.includes(item.key);
                  });
                  if (childrenResult.length > 0) {
                    result.push(e.key);
                    childrenResult.forEach(children => {
                      result.push(children.key);
                    });
                  }
                }
              }
            });
            return result;
          }
          checkedRole = handleCheckedRole(this.roleData, checkedRole);
        }
        fetch.post('/role/saveRoleAuthority', {
          id: this.roleId,
          authorityIds: checkedRole
        }).then(({msg}) => {
          this.buttonLoading = false;
          this.$message({
            type: 'success',
            message: msg
          });
          this.roleDialogVisible = false;
        }).catch(({msg}) => {
          this.buttonLoading = false;
          this.$message({
            type: 'error',
            message: msg
          });
          this.roleDialogVisible = false;
        });
      },
      handleRoleCancel() {
        this.buttonLoading = false;
        this.roleDialogVisible = false;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetch.post('/role/delete/' + row.id).then(({msg}) => {
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
