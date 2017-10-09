<template>
  <div class="app-wrapper">
    <v-sider class="sidebar-container"></v-sider>
    <div class="main-container">
      <v-header></v-header>
      <v-content></v-content>
    </div>
  </div>
</template>

<script>
  import vHeader from './header';
  import vSider from './sider';
  import vContent from './content';

  export default {
    components: {
      vHeader,
      vSider,
      vContent
    }
  };
</script>

<style scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .sidebar-container {
    transition: width 0.28s ease-out;
    width: 190px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .main-container {
    min-height: 100%;
    transition: all .28s ease-out;
    margin-left: 190px;
    padding-bottom: 50px
  }
</style>
