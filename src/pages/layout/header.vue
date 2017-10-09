<template>
  <el-row class="header">
    <el-col :span="18">
      <v-header-tag></v-header-tag>
    </el-col>
    <el-col :span="6" class="header-option">
      <div class="header-pwd">
        <router-link to="/updatePassword">
          修改密码
        </router-link>
      </div>
      <div>
        <a @click.prevent="handleLogout">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';
  import {LOGOUT} from '@/store/user';
  import vHeaderTag from './header-tag';

  export default {
    methods: {
      ...mapActions([LOGOUT]),
      handleLogout() {
        this.$confirm('确定要退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.LOGOUT().then(() => {
            window.location.reload();
          });
        }).catch(() => {
        });
      }
    },
    components: {
      vHeaderTag
    }
  };
</script>

<style scoped>
  .header {
    width: 100%;
    height: 60px;
    position: fixed;
    background: #EFF2F7;
    top: 0;
    bottom: 0;
    left: 190px;
    z-index: 1000;
    line-height: 60px;
  }

  .header-option div {
    display: inline-block;
  }

  .header-pwd {
    width: 20%;
  }

  .header a {
    color: #1F2D3D;
    font-size: 14px;
  }

  .header a:hover {
    color: #20A0FF;
    cursor: pointer;
  }

</style>
