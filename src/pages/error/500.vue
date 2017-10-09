<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div class="error-tips">
          <p class="tips-1">500 !</p>
          <p class="tips-2">很抱歉，服务器似乎开小差了......</p>
          <p class="tips-3 mt-10">
            请联系系统管理员，或稍后重试！
          </p>
          <ul class="tips-4 mt-10">
            <li>
              <a @click.prevent="toIndex">返回主页</a>
            </li>
          </ul>
        </div>

      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <img class="error-img" :src="error500" alt="500">
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import error500 from '@/assets/img/error-500.gif';

  export default {
    data() {
      return {
        error500
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
    width: 313px;
    height: 428px;
    margin: 15% 20%;
  }

  .error-tips {
    width: 100%;
    margin: 30% 40%;
  }

  .tips-1 {
    font-size: 60px;
    font-weight: 700;
    color: #1F2D3D;
  }

  .tips-2 {
    font-size: 20px;
    line-height: 24px;
    color: #1F2D3D;
  }

  .tips-3 {
    font-size: 13px;
    line-height: 21px;
    color: grey;
  }

  .tips-4 {
    color: #475669;
  }

  .tips-4 a:hover {
    color: #99A9BF;
    cursor: pointer;
  }
</style>
