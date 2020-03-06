import vue from 'vue';
import Sd from '@skydragon/base';
import Cookie from '@tbj/cookie';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './base/main';
import { ComConfig, RouterConfig, StoreConfig } from './collect/index';

Vue.config.devtools = true;

// Router
Vue.use(VueRouter);

// Resource
Vue.use(VueResource);

// Cookie
Vue.use(Cookie);

// Skydragon
Sd.injection(Vue, ComConfig);
Vue.use(Sd);

// 配置 resource
Vue.http.options.root = '';
Vue.http.options.emulateJSON = true;

const router = RouterConfig(VueRouter);

new Vue(Vue.util.extend({
  router,
  StoreConfig
}, App)).$mount('#app');