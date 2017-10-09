import {constantRouter, asyncRouter} from '../config/router';

const GENERATE_ROUTE = 'GENERATE_ROUTE';
const GET_ROUTER = 'GET_ROUTER';
const SET_ROUTER = 'SET_ROUTER';
const GET_ADD_ROUTER = 'GET_ADD_ROUTER';

function hasPermission(roles, {auth, key}) {
  return !auth ? true : roles.includes(key);
}

function filterAsyncRouter(asyncRouter, roles) {
  const accessedRouter = asyncRouter.filter(router => {
    if (hasPermission(roles, router.meta)) {
      if (Boolean(router.children)) {
        router.children = filterAsyncRouter(router.children, roles);
      }
      return true;
    } else {
      return false
    }
  });
  return accessedRouter;
}

export {GENERATE_ROUTE, GET_ROUTER, GET_ADD_ROUTER};
export default {
  state: {
    router: constantRouter,
    addRouter: []
  },
  getters: {
    [GET_ROUTER]: state => {
      return state.router;
    },
    [GET_ADD_ROUTER]: state => {
      return state.addRouter;
    }
  },
  mutations: {
    [SET_ROUTER](state, router) {
      state.addRouter = router;
      state.router = constantRouter.concat(router);
    }
  },
  actions: {
    [GENERATE_ROUTE]({commit}, data) {
      return new Promise(resolve => {
        commit(SET_ROUTER, filterAsyncRouter(asyncRouter, data));
        resolve();
      })
    }
  }
};
