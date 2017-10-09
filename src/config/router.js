import vue from 'vue';
import router from 'vue-router';
import store from '../store/';
import {LOGOUT_FED, GET_TOKEN, GET_ROLES, GET_USER_INFO} from '../store/user';
import {GENERATE_ROUTE, GET_ADD_ROUTER} from '../store/permission';

vue.use(router);

const constantRouter = [{
  path: '/',
  hidden: true,
  redirect: '/index',
  component: () => import ('../pages/layout/layout'),
  children: [{
    path: 'index',
    name: '首页',
    meta: {auth: false},
    hidden: true,
    component: () => import ('../pages/index/index')
  }, {
    path: 'updatePassword',
    name: '修改密码',
    meta: {
      auth: false,
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/password/update')
  }]
}, {
  path: '/login',
  name: '登录页',
  hidden: true,
  component: () => import ('../pages/login/login')
}, {
  path: '/firstUpdatePassword',
  name: '第一次修改密码',
  meta: {auth: false},
  hidden: true,
  component: () => import ('../pages/password/first-update')
}, {
  path: '/401',
  name: '401',
  hidden: true,
  component: () => import ('../pages/error/401')
}, {
  path: '/404',
  name: '404',
  hidden: true,
  component: () => import ('../pages/error/404')
}, {
  path: '/500',
  name: '500',
  hidden: true,
  component: () => import ('../pages/error/500')
}];

const asyncRouter = [{
  path: '/invoice',
  name: '发票管理',
  meta: {
    auth: true,
    key: 'invoice'
  },
  component: () => import ('../pages/layout/layout'),
  children: [{
    path: 'invoiceMake',
    name: '发票开具',
    meta: {
      auth: true,
      key: 'invoiceMake',
      tag: true
    },
    component: () => import ('../pages/invoiceMake/make')
  }, {
    path: 'batchInvoiceMake',
    name: '批量电子发票开具',
    meta: {
      auth: true,
      key: 'batchInvoiceMake',
      tag: true
    },
    component: () => import ('../pages/batchInvoiceMake/list')
  }, {
    path: 'batchInvoiceMakeDetail/:state',
    name: '批量电子发票详情',
    meta: {
      auth: true,
      key: 'batchInvoiceMake',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/batchInvoiceMake/detail')
  }, {
    path: 'redInvoiceMake',
    name: '红字发票开具',
    meta: {
      auth: true,
      key: 'redInvoiceMake',
      tag: true
    },
    component: () => import ('../pages/redInvoiceMake/make')
  }, {
    path: 'redInvoiceMakeNext/:state',
    name: '红字发票开具下一步',
    meta: {
      auth: true,
      key: 'redInvoiceMake',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/redInvoiceMake/next')
  }]
}, {
  path: '/query',
  name: '查询系统',
  meta: {
    auth: true,
    key: 'query'
  },
  component: () => import ('../pages/layout/layout'),
  children: [{
    path: 'invoiceQuery',
    name: '发票查询',
    meta: {
      auth: true,
      key: 'invoiceQuery',
      tag: true
    },
    component: () => import ('../pages/invoiceQuery/list')
  }, {
    path: 'invoiceQueryDetail/:state',
    name: '发票查询详情',
    meta: {
      auth: true,
      key: 'invoiceQuery',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/invoiceQuery/detail')
  }, {
    path: 'invoiceStatistics',
    name: '开票统计',
    meta: {
      auth: true,
      key: 'invoiceStatistics',
      tag: true
    },
    component: () => import ('../pages/invoiceStatistics/list')
  }]
}, {
  path: '/manage',
  name: '基础管理',
  meta: {
    auth: true,
    key: 'manage'
  },
  component: () => import ('../pages/layout/layout'),
  children: [{
    path: 'userManage',
    name: '用户管理',
    meta: {
      auth: true,
      key: 'userManage',
      tag: true
    },
    component: () => import ('../pages/userManage/list')
  }, {
    path: 'userManageAdd',
    name: '用户新增',
    meta: {
      auth: true,
      key: 'userManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/userManage/add')
  }, {
    path: 'userManageModify/:state',
    name: '用户修改',
    meta: {
      auth: true,
      key: 'userManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/userManage/modify')
  }, {
    path: 'roleManage',
    name: '角色管理',
    meta: {
      auth: true,
      key: 'roleManage',
      tag: true
    },
    component: () => import ('../pages/roleManage/list')
  }, {
    path: 'roleManageAdd',
    name: '角色新增',
    meta: {
      auth: true,
      key: 'roleManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/roleManage/add')
  }, {
    path: 'roleManageModify/:state',
    name: '角色修改',
    meta: {
      auth: true,
      key: 'roleManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/roleManage/modify')
  }, {
    path: 'storeManage',
    name: '门店管理',
    meta: {
      auth: true,
      key: 'storeManage',
      tag: true
    },
    component: () => import ('../pages/storeManage/list')
  }, {
    path: 'storeManageAdd',
    name: '门店新增',
    meta: {
      auth: true,
      key: 'storeManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/storeManage/add')
  }, {
    path: 'storeManageModify/:state',
    name: '门店信息修改',
    meta: {
      auth: true,
      key: 'storeManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/storeManage/modify')
  }, {
    path: 'sellerManage',
    name: '销方信息管理',
    meta: {
      auth: true,
      key: 'sellerManage',
      tag: true
    },
    component: () => import ('../pages/sellerManage/list')
  }, {
    path: 'sellerManageAdd',
    name: '销方信息新增',
    meta: {
      auth: true,
      key: 'sellerManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/sellerManage/add')
  }, {
    path: 'sellerManageModify/:state',
    name: '销方信息修改',
    meta: {
      auth: true,
      key: 'sellerManage',
      tag: true
    },
    hidden: true,
    component: () => import ('../pages/sellerManage/modify')
  }, {
    path: 'commodityManage',
    name: '常用商品管理',
    meta: {
      auth: true,
      key: 'commodityManage',
      tag: true
    },
    component: () => import ('../pages/commodityManage/list')
  }]
}, {
  path: '*',
  meta: {auth: false},
  hidden: true,
  redirect: '/404'
}];

const instance = new router({
  routes: constantRouter
});

const whiteList = ['/login', '/firstUpdatePassword', '/401', '/404', '/500'];

function hasPermission(roles, {auth, key}) {
  return !auth ? true : roles.includes(key);
}

instance.beforeEach((to, from, next) => {
  var {path, meta} = to;
  if (whiteList.includes(path)) {
    next();
  } else {
    if (Boolean(store.getters[GET_TOKEN])) {
      var roles = store.getters[GET_ROLES];
      if (roles.length === 0) {
        store.dispatch(GET_USER_INFO).then(({data}) => {
          if (data.length === 0 && path === '/index') {
            next();
          } else {
            store.dispatch(GENERATE_ROUTE, data).then(() => {
              instance.addRoutes(store.getters[GET_ADD_ROUTER]);
              next({...to});
            });
          }
        }).catch(() => {
          store.dispatch(LOGOUT_FED).then(() => {
            next('/login');
          });
        });
      } else {
        if (hasPermission(roles, meta)) {
          next();
        } else {
          next('/401');
        }
      }
    } else {
      next('/login');
    }
  }
});

export {constantRouter, asyncRouter};
export default instance;
