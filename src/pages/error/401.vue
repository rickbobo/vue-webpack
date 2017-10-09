<template>
  <el-row class="error401-container">
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div class="error-tips">
          <p class="tips-1">401 !</p>
          <p class="tips-2">很抱歉，您没有权限访问该页面......</p>
          <p class="tips-3 mt-10">
            如需访问，请联系相关人员开通权限！
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
        <img class="error-img" :src="error401" alt="401">
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import error401 from '@/assets/img/error-401.gif';

  export default {
    data() {
      return {
        error401
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
  .error401-container{
    height: 100vh;
    background-color: #e3e3e3
  }
  .error-img {
    width: 600px;
    height: 450px;
    margin: 15% 5%;
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
