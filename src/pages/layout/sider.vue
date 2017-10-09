<template>
  <div>
    <router-link to="/index">
      <div class="header-title">
        Web +
      </div>
    </router-link>
    <el-menu theme="dark" unique-opened :default-active="$route.path">
      <v-sider-item :routes='GET_ROUTER'></v-sider-item>
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {GET_ROUTER} from '@/store/permission';
  import vSiderItem from './sider-item';

  export default {
    computed: {
      ...mapGetters([GET_ROUTER])
    },
    components: {
      vSiderItem
    }
  };
</script>

<style scoped>

  .header-title {
    height: 60px;
    line-height: 60px;
    text-indent: 20px;
    font-size: 24px;
    color: #FFFFFF;
    background: #324157
  }

  .header-title:hover {
    color: #20a0ff;
    cursor: pointer;
  }

  .el-menu {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    height: 100vh;
  }
</style>
