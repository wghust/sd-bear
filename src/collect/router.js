// 导入路由
import IndexRouter from 'business/index/router';

export default (VueRouter) => {
  return new VueRouter({
    base: __dirname,
    routes: [...IndexRouter, {
      path: '*',
      redirect: '/index'
    }]
  })
};