import vue from 'vue';
import vuex from 'vuex';
import user from './user';
import permission from './permission';
import headerTag from './header-tag';

vue.use(vuex);

export default new vuex.Store({
  strict: process.env.NODE_ENV !== 'production',  //在非生产环境下，使用严格模式
  modules: {
    user,
    permission,
    headerTag
  }
});
