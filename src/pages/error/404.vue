<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <img class="error-img" :src="error404" alt="404">
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <div class="error-tips">
          <p class="tips-1">Oops!</p>
          <p class="tips-2 mt-10">很抱歉，您访问的页面被火星人带走了......</p>
          <p class="tips-3 mt-10">
            请检查您输入的网址是否正确，或点击按钮返回主页
          </p>
          <a class="tips-button" @click.prevent="toIndex">返回首页</a>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import error404 from '@/assets/img/error-404.png';

  export default {
    data() {
      return {
        error404
      };
    },
    methods: {
      toIndex() {
        this.$router.replace('/index');
      }
    }
  };
</script>

<style scoped>
  .error-img {
    width: 100%;
    margin: 20% 20%;
  }

  .error-tips {
    width: 100%;
    margin: 30% 20%;
  }

  .tips-1 {
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
    color: #20A0FF;
  }

  .tips-2 {
    font-size: 20px;
    line-height: 24px;
    color: #20A0FF;
  }

  .tips-3 {
    font-size: 13px;
    line-height: 21px;
    color: #8492A6;
  }

  .tips-button {
    display: block;
    width: 110px;
    height: 36px;
    background: #20A0FF;
    border-radius: 100px;
    text-align: center;
    color: #FFFFFF;
    font-size: 14px;
    line-height: 36px;
    cursor: pointer;
    margin-top: 25px;
  }
</style>
