<template>
  <img :src="indexBg">
</template>

<script>
  import indexBg from '@/assets/img/index-bg.png';
  export default {
    data() {
      return {
        indexBg
      };
    }
  };
</script>

<style scoped>
  img {
    width: 100%;
    height: 100vh;
  }
</style>
