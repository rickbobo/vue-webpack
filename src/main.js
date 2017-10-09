import vue from 'vue';
import app from './app';
import store from './store/';
import router from './config/router';
import elementUI from 'element-ui';
import './config/filter';
import './config/directive';
import './components/';
import 'element-ui/lib/theme-default/index.css';
import 'viewerjs/dist/viewer.min.css';
import './assets/css/style.css';

vue.config.productionTip = false;
vue.use(elementUI);

new vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');
