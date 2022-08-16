import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
// 静态路由
export const constantRoutes = [
  // 重定向
  {
    path: '/',
    component: () => import('@/views/notice/index'),
    redirect: '/notice'// 重定向
  },
  // 登录
  {
    path: '/login', // 登录页
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 公告页（首页）
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Notice',
        component: () => import('@/views/notice/index'),
        meta: {
          title: '公告',
          icon: 'el-icon-notebook-1',
          roles: ['admin', 'teacher', 'student']
        }
      }
    ]
  },

  // 404
  {
    path: '/404', // 404
    component: () => import('@/views/404'),
    hidden: true
  }
]
// asyncRoutes 动态路由
export const asyncRoutes = [

  // 用户管理
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-s-custom', roles: ['admin'] }
      }
    ]

  },
  // 信息管理
  {
    path: '/infoManagement',
    component: Layout,
    redirect: '/infoManagement/teacher', // 重定向
    meta: { title: '信息管理', icon: 'dashboard', roles: ['admin', 'teacher', 'student'] },
    name: 'InfoManagement',
    children: [
      {
        path: 'teacher',
        meta: { title: '教师信息管理', roles: ['admin', 'teacher'] },
        component: () => import('@/views/infoManagement/teacher/index')
      },
      {
        path: 'student',
        meta: { title: '学生信息管理', roles: ['admin', 'teacher', 'student'] },
        component: () => import('@/views/infoManagement/student/index')
      }
    ]
  },

  // 实习周报
  {
    path: '/report',
    component: Layout,
    redirect: '/report/new',
    meta: { title: '实习周报管理', icon: 'el-icon-data-analysis', roles: ['admin', 'teacher', 'student'] },
    children: [
      {
        path: 'new',
        // name: 'New',
        component: () => import('@/views/internReport/newReport/index'),
        meta: { title: '填写周报', icon: 'form', roles: ['admin', 'student'] }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/internReport/reportList/index'),
        meta: { title: '周报列表', icon: 'el-icon-s-order', roles: ['admin', 'teacher', 'student'] }
      }
    ]
  },
  // 我的实习
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/internMsg',
    name: 'Nested',
    meta: {
      title: '实习信息管理',
      icon: 'nested',
      roles: ['admin', 'teacher', 'student']
    },
    children: [
      {
        path: 'internMsg',
        component: () => import('@/views/nested/internMsg/index'),
        meta: { title: '实习信息填写', roles: ['admin', 'student'] }
      },
      {
        path: 'myIntern',
        component: () => import('@/views/nested/myIntern/index'),
        meta: { title: '查看实习信息', roles: ['admin', 'teacher', 'student'] }
      }
      // {
      //   path: 'internScore',
      //   component: () => import('@/views/nested/internScore/index'),
      //   meta: { title: '实习成绩', roles: ['admin', 'teacher', 'student'] }
      // }
    ]
  },
  // 评分系统
  {
    path: '/score',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Score',
        component: () => import('@/views/score/index'),
        meta: { title: '评分', icon: 'el-icon-s-help', roles: ['admin', 'teacher'] }
      }
    ]
  },
  // 成绩单
  {
    path: '/score-card',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Score',
        component: () => import('@/views/scoreCard/index'),
        meta: { title: '成绩单', icon: 'link',
          roles: ['admin', 'teacher'] }
      }
    ]
  },
  // 论坛
  {
    path: '/forum',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Forum',
        component: () => import('@/views/forum/index'),
        meta: { title: '论坛', icon: 'el-icon-s-help', roles: ['admin', 'teacher', 'student'] }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
  // routes: [...constantRoutes]
})

const router = createRouter()
// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
