import {Base64} from 'js-base64';
import fetch from '../config/fetch';
import util from '../assets/js/util';

const TOKEN_KEY = 'X-Token';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGOUT_FED = 'LOGOUT_FED';
const GET_TOKEN = 'GET_TOKEN';
const SET_TOKEN = 'SET_TOKEN';
const GET_ROLES = 'GET_ROLES';
const SET_ROLES = 'SET_ROLES';
const GET_USER_INFO = 'GET_USER_INFO';

export {LOGIN, LOGOUT, LOGOUT_FED, GET_TOKEN, SET_TOKEN, GET_ROLES, GET_USER_INFO};
export default {
  state: {
    token: sessionStorage.getItem(TOKEN_KEY) || '',
    roles: []
  },
  getters: {
    [GET_TOKEN]: state => {
      return state.token;
    },
    [GET_ROLES]: state => {
      return state.roles;
    }
  },
  mutations: {
    [LOGOUT](state) {
      sessionStorage.removeItem(TOKEN_KEY);
      state.token = '';
      state.roles = [];
    },
    [SET_TOKEN](state) {
      const token = Base64.encode(Date.now());
      sessionStorage.setItem(TOKEN_KEY, token);
      state.token = token;
    },
    [SET_ROLES](state, roles) {
      state.roles = roles;
    }
  },
  actions: {
    [LOGIN]({commit}, data) {
      return new Promise((resolve, reject) => {
        fetch.post('/login', util.stringify(data)).then(res => {
          commit(SET_TOKEN);
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
    [LOGOUT]({commit}) {
      return new Promise(resolve => {
        fetch.get('/logout').then(() => {
          commit(LOGOUT);
          resolve();
        }).catch(() => {
          commit(LOGOUT);
          resolve();
        });
      });
    },
    [LOGOUT_FED]({commit}) {
      return new Promise(resolve => {
        commit(LOGOUT);
        resolve();
      });
    },
    [SET_TOKEN]({commit}) {
      return new Promise(resolve => {
        commit(SET_TOKEN);
        resolve();
      });
    },
    [GET_USER_INFO]({commit}) {
      return new Promise((resolve, reject) => {
        fetch.get('/auth/listAuthority').then(res => {
          commit(SET_ROLES, res.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    }
  }
};
