<template>
  <div>
    <template v-for="item in routes">
      <el-submenu :index="item.name" v-if="!item.hidden">
        <template slot="title">{{item.name}}</template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item v-if='child.children && child.children.length > 0' :routes='[child]'></sidebar-item>
          <router-link v-else :to="item.path + '/' + child.path">
            <el-menu-item :index="item.path + '/' + child.path">
              {{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      routes: {
        type: Array
      }
    }
  };
</script>

<style scoped>
</style>
