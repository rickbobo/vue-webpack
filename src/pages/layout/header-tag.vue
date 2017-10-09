<template>
  <div class="header-tag-container">
    <router-link class="header-tag" v-for="tag in GET_TAG" :to="tag.path" :key="tag.path">
      <el-tag :closable="true" :type="isActive(tag.path)" @close="handleCloseTag(tag, $event)">
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {GET_TAG, ADD_TAG, DELETE_TAG} from '@/store/header-tag';

  export default {
    methods: {
      ...mapActions([ADD_TAG, DELETE_TAG]),
      isActive(path) {
        return path === this.$route.path ? 'primary' : '';
      },
      handleCloseTag(tag, e) {
        e.preventDefault();
        this.DELETE_TAG(tag);
        var lastTag = _.last(this.GET_TAG);
        if (Boolean(lastTag)) {
          this.$router.push(lastTag.path);
        }
      },
      handleAddTag() {
        var {meta} = this.$route;
        if (Boolean(meta) && meta.tag) {
          this.ADD_TAG(this.$route);
        } else {
          return;
        }
      }
    },
    computed: {
      ...mapGetters([GET_TAG])
    },
    watch: {
      $route() {
        this.handleAddTag();
      },
      GET_TAG() {
        if (this.GET_TAG.length === 0) {
          this.$router.push('/index');
        }
      }
    }
  };
</script>

<style scoped>
  .header-tag-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }

  .header-tag-container .header-tag {
    margin-left: 10px;
  }
</style>
