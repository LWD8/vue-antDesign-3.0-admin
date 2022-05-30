import Mock from 'mockjs2'
import { builder } from '../util'

const info = options => {
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '天野远子',
    username: 'admin',
    password: '',
    avatar: '/images/avatar.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {}
  }
  // role
  const roleObj = {
    id: 'admin',
    name: '管理员',
    describe: '拥有所有权限',
    status: 1,
    creatorId: 'system',
    createTime: 1497160610259,
    deleted: 0,
    permissions: [
      {
        roleId: 'admin',
        permissionId: 'dashboard',
        permissionName: '仪表盘',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'exception',
        permissionName: '异常页面权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'result',
        permissionName: '结果权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'profile',
        permissionName: '详细页权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'table',
        permissionName: '表格权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'import',
            describe: '导入',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'form',
        permissionName: '表单权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'order',
        permissionName: '订单管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'permission',
        permissionName: '权限管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'role',
        permissionName: '角色管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'table',
        permissionName: '桌子管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'user',
        permissionName: '用户管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'import',
            describe: '导入',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          },
          {
            action: 'export',
            describe: '导出',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      }
    ]
  }

  roleObj.permissions.push({
    roleId: 'admin',
    permissionId: 'support',
    permissionName: '超级模块',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false
      },
      {
        action: 'import',
        describe: '导入',
        defaultCheck: false
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false
      },
      {
        action: 'export',
        describe: '导出',
        defaultCheck: false
      }
    ],
    actionList: null,
    dataAccess: null
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

/**
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 * @param {*} options
 * @returns
 */
const userNav = options => {
  const nav = [
    // ip
    {
      name: 'ip',
      parentId: 0,
      id: 300010,
      meta: {
        icon: 'table',
        title: 'IP管理',
        show: true
      },
      redirect: '/ip/ipList',
      component: 'RouteView'
    },
    {
      name: 'ipList',
      parentId: 300010,
      id: 300011,
      meta: {
        icon: 'table',
        title: 'IP列表',
        show: true
      },
      component: 'IpManageList'
    },
    {
      name: 'ipGroup',
      parentId: 300010,
      id: 300012,
      meta: {
        icon: 'table',
        title: 'IP分组',
        show: true
      },
      component: 'IpGroup'
    },
    // tiktop
    {
      name: 'tiktok',
      parentId: 0,
      id: 400010,
      meta: {
        icon: 'table',
        title: '账号管理',
        show: true
      },
      redirect: '/list/tiktokList',
      component: 'RouteView'
    },
    {
      name: 'tiktokList',
      parentId: 400010,
      id: 400011,
      meta: {
        icon: 'table',
        title: '账号列表',
        show: true
      },
      component: 'TiktokList'
    },
    {
      name: 'tiktokUpdate',
      parentId: 400010,
      id: 400012,
      meta: {
        icon: 'table',
        title: '上传账号',
        show: true
      },
      component: 'UpdateTiktok'
    },
    {
      name: 'tiktokLabel',
      parentId: 400010,
      id: 400013,
      meta: {
        icon: 'table',
        title: '标签列表',
        show: true
      },
      component: 'TiktokLabel'
    },
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
  const json = builder(nav)
  return json
}

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
