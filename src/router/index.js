import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import articleList from '../components/articleList'
import newArticle from '../components/newArticle'
import nowArticle from '../components/nowArticle'
import Homeland from '../components/Homeland'
import IOSN from '../components/IOSN'
import login from '../components/login'

Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

export default new Router({
    routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component:index,
      // redirect:'/articleList',
      children: [
        {
          path: 'articleList',
          component: articleList,
        },
        {
          path: 'newArticle',
          component: newArticle,
        },
        {
          path: 'nowArticle',
          component: nowArticle,
        },
        {
          path: 'Homeland',
          component: Homeland,
        },
        {
          path: 'IOSN',
          component: IOSN,
        },
      ]
    },

  ]
})
