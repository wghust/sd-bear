import Vue from 'vue';
import Vuex from 'vuex';
import Request from './request';

// 加载业务的store
import IndexStore from 'business/index/store';

// 配置基本state
const state = {

};

// 配置基本mutations
const mutations = {

};

// 配置基本action
const actions = (() => {
  const ah = Request();
  const apiObj = {};

  return {

  }
})();

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    index: IndexStore
  }
});