import Vue from 'vue'
import Router from 'vue-router'
import editorutils from '@/components/editorutils'
import index from '@/components/index'
import login from '@/components/login'
import testlogin from '@/components/testlogin'
import backmanage from '@/components/backmanage'
import logout from '@/components/logout'
import dialog from '@/components/dialog'
// import demo from '@/components/demo'



// import testback from '@/components/testback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },

    {
      path: '/login',
      name: 'login',
      component: testlogin
    },
    {
      path: '/manage',
      name: 'backmanage',
      component: backmanage
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: dialog
    },
    // {
    //   path: '/aa',
    //   name: 'UEditor',
    //   component: UEditor
    // },
    {
      path: '/editorutils',
      name: 'editorutils',
      component: editorutils
    },
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: demo
    // },

  ],
  mode:"history"
})
