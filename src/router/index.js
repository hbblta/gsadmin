import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import articleList from '../components/articleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:index,
      children: [
        {
          path: 'articleList',
          component: articleList,
        },
      ]
    },
    // {
    //   path: '/articleList',
    //   name: 'articleList',
    //   component: articleList
    // },
  ]
})
