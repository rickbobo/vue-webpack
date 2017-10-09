<template>
  <div class="right-container">
    <el-form :inline="true" :model="searchForm" label-position="left" label-width="100px" class="search-form">
      <el-form-item label="税收分类编码">
        <el-input placeholder="请输入税收分类编码" v-model.trim="searchForm.taxCode"></el-input>
      </el-form-item>
      <el-form-item label="税收分类名称">
        <el-input placeholder="请输入税收分类名称" v-model.trim="searchForm.taxType"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input placeholder="请输入商品名称" v-model.trim="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="企业商品编号">
        <el-input placeholder="请输入企业商品编号" v-model.trim="searchForm.imId"></el-input>
      </el-form-item>
      <el-form-item label="税率">
        <el-select placeholder="请选择税率" v-model="searchForm.taxRate" filterable clearable>
          <el-option v-for="item in taxRateList" :key="item.taxRate" :label="item.taxRate" :value="item.gec04">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="getPageData">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="pageData" empty-text="暂无数据">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="商品名称：">
              <span>{{props.row.imName}}</span>
            </el-form-item>
            <el-form-item label="企业商品编号：">
              <span>{{props.row.imId}}</span>
            </el-form-item>
            <el-form-item label="税收分类编码：">
              <span>{{props.row.imInvclass}}</span>
            </el-form-item>
            <el-form-item label="税收分类名称：">
              <span>{{props.row.imInvcname}}</span>
            </el-form-item>
            <el-form-item label="税率：">
              <span>{{props.row.gec04 + '%'}}</span>
            </el-form-item>
            <el-form-item label="规格型号：">
              <span>{{props.row.imModels}}</span>
            </el-form-item>
            <el-form-item label="计量单位：">
              <span>{{props.row.gfe02}}</span>
            </el-form-item>
            <el-form-item label="含税价标志：">
              <span>{{props.row.imIncludeTaxFlag | imIncludeTaxFlag}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
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

  export default {
    mixins: [pageData, elSelectWidth],
    data() {
      return {
        searchForm: {
          taxCode: '',
          taxType: '',
          name: '',
          imId: '',
          taxRate: ''
        },
        taxRateList: []
      };
    },
    methods: {
      getPageData() {
        this.loading = true;
        fetch.get('/item/getAll', {
          params: {
            taxCode: this.searchForm.taxCode,
            taxType: this.searchForm.taxType,
            name: this.searchForm.name,
            imId: this.searchForm.imId,
            taxRate: this.searchForm.taxRate,
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
      gec04Filter({gec04}) {
        return gec04 + '%';
      }
    },
    filters: {
      imIncludeTaxFlag(val) {
        return val === true ? '是' : '否';
      }
    },
    mounted() {
      fetch.get('/item/getRateList').then(({data}) => {
        this.taxRateList = data;
      }).catch(() => {
      });
    }
  }
</script>

<style scoped>
</style>
