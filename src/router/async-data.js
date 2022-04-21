// 替换mock请示返回的动态路由列表
// 如果到时做动态路由，则可以把下面数据，复制到Mock模拟数据
// src/mock/services/user userNav.nav数据
export default [
  // proxy
  {
    name: 'proxy',
    parentId: 0,
    id: 500010,
    meta: {
      icon: 'table',
      title: '代理管理',
      show: true
    },
    redirect: '/proxy/ProxyGroup',
    component: 'RouteView'
  },
  {
    name: 'proxyGroup',
    parentId: 500010,
    id: 500012,
    meta: {
      icon: 'table',
      title: '代理组',
      show: true
    },
    component: 'ProxyGroup'
  },

  // -------------------下面为模板页面---------------------
  // list
  {
    name: 'list',
    parentId: 0,
    id: 10010,
    meta: {
      icon: 'table',
      title: '列表页',
      show: true
    },
    redirect: '/list/table-list',
    component: 'RouteView'
  },
  {
    name: 'table-list',
    parentId: 10010,
    id: 10011,
    path: '/list/table-list/:pageNo([1-9]\\d*)?',
    meta: {
      title: '查询表格',
      show: true
    },
    component: 'TableList'
  },
  // form
  {
    name: 'form',
    parentId: 0,
    id: 10,
    meta: {
      icon: 'form',
      title: '表单页'
    },
    redirect: '/form/basic-form',
    component: 'RouteView'
  },
  {
    name: 'basic-form',
    parentId: 10,
    id: 6,
    meta: {
      title: '基础表单'
    },
    component: 'BasicForm'
  },
  {
    name: 'step-form',
    parentId: 10,
    id: 5,
    meta: {
      title: '分步表单'
    },
    component: 'StepForm'
  },
  {
    name: 'advanced-form',
    parentId: 10,
    id: 4,
    meta: {
      title: '高级表单'
    },
    component: 'AdvanceForm'
  },

  // Exception
  {
    name: 'exception',
    parentId: 0,
    id: 10024,
    meta: {
      title: '异常页',
      icon: 'warning',
      show: false
    },
    redirect: '/exception/403',
    component: 'RouteView'
  },
  {
    name: '403',
    parentId: 10024,
    id: 10025,
    meta: {
      title: '403',
      show: true
    },
    component: 'Exception403'
  },
  {
    name: '404',
    parentId: 10024,
    id: 10026,
    meta: {
      title: '404',
      show: true
    },
    component: 'Exception404'
  },
  {
    name: '500',
    parentId: 10024,
    id: 10027,
    meta: {
      title: '500',
      show: true
    },
    component: 'Exception500'
  },

  // account
  {
    name: 'account',
    parentId: 0,
    id: 10028,
    meta: {
      title: '个人页',
      icon: 'user',
      show: false
    },
    redirect: '/account/center',
    component: 'RouteView'
  },
  // 特殊三级菜单
  {
    name: 'settings',
    parentId: 10028,
    id: 10030,
    meta: {
      title: '个人设置',
      hideHeader: true,
      hideChildren: true,
      show: true
    },
    redirect: '/account/settings/basic',
    component: 'AccountSettings'
  },
  {
    name: 'BasicSettings',
    path: '/account/settings/basic',
    parentId: 10030,
    id: 10031,
    meta: {
      title: '基本设置',
      show: false
    },
    component: 'BasicSetting'
  },
  {
    name: 'SecuritySettings',
    path: '/account/settings/security',
    parentId: 10030,
    id: 10032,
    meta: {
      title: '安全设置',
      show: false
    },
    component: 'SecuritySettings'
  },
  {
    name: 'CustomSettings',
    path: '/account/settings/custom',
    parentId: 10030,
    id: 10033,
    meta: {
      title: '个性化设置',
      show: false
    },
    component: 'CustomSettings'
  },

  {
    name: 'otherPage',
    parentId: 0,
    id: 20030,
    meta: {
      title: '其他组件',
      hideHeader: true,
      show: true
    },
    redirect: '/other/icon-selector',
    component: 'RouteView'
  },
  {
    name: 'TreeList',
    parentId: 20030,
    id: 40030,
    meta: {
      title: '树目录表格',
      keepAlive: true,
      show: true
    },
    path: '/other/list/tree-list',
    component: 'TreeList'
  },
  {
    name: 'TableInnerEditList',
    parentId: 20030,
    id: 40030,
    meta: {
      title: '内联编辑表格',
      keepAlive: true,
      show: true
    },
    path: '/other/list/edit-table',
    component: 'TableInnerEditList'
  },
  {
    name: 'UserList',
    parentId: 20030,
    id: 40030,
    meta: {
      title: '用户列表',
      keepAlive: true,
      show: true
    },
    path: '/other/list/user-list',
    component: 'UserList'
  },
  {
    name: 'RoleList',
    parentId: 20030,
    id: 40030,
    meta: {
      title: '角色列表',
      keepAlive: true,
      show: true
    },
    path: '/other/list/role-list',
    component: 'RoleList'
  },
  {
    name: 'PermissionList',
    parentId: 20030,
    id: 40030,
    meta: {
      title: '权限列表',
      keepAlive: true,
      show: true
    },
    path: '/other/list/permission-list',
    component: 'PermissionList'
  }
]
