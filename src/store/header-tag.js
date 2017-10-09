const GET_TAG = 'GET_TAG';
const ADD_TAG = 'ADD_TAG';
const DELETE_TAG = 'DELETE_TAG';

export {GET_TAG, ADD_TAG, DELETE_TAG};
export default {
  state: [],
  getters: {
    [GET_TAG]: state => {
      return state.slice(-9);
    }
  },
  mutations: {
    [ADD_TAG](state, tag) {
      var index;
      for (let [i, v] of state.entries()) {
        if (v.name === tag.name) {
          index = i;
          break;
        }
      }
      if (typeof index !== 'undefined') {
        state.splice(index, 1, {name: tag.name, path: tag.path});
      } else {
        state.push({name: tag.name, path: tag.path});
      }
    },
    [DELETE_TAG](state, tag) {
      var index;
      for (let [i, v] of state.entries()) {
        if (v.path === tag.path) {
          index = i;
          break;
        }
      }
      state.splice(index, 1);
    }
  },
  actions: {
    [ADD_TAG]({commit}, tag) {
      commit(ADD_TAG, tag);
    },
    [DELETE_TAG]({commit}, tag) {
      commit(DELETE_TAG, tag);
    }
  }
}
