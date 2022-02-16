import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/DataBoard'
  },
  {
    name: 'DataBoard',
    component: () => import('@/views/DataBoard'),
    meta: {
      title: '数据看板'
    }
  }
]

// 添加route.path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new VueRouter({ routes })

// 上标题
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router
