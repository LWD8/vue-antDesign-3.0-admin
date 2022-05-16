import { i18nRender } from '@/locales'
import defaultSettings from '@/config/defaultSettings'
import asyncRouters from '@/router/async-data'
import { isObject } from './is'

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    (event) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword(pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
    variationCount += variations[check] === true ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}

/**
 * 截取字符串，生成数组
 * @param {string} src 传入数据 123:123\n123:123\n123:123
 * @param {boolean} isHomeLoad 首次加载，追加相关keys
 * @param {Object} param 为截取顺序与次数
 *  symbol 截取字符
 *  keys 截取完成后，追加数组对象字段
 *  defaultItemValue 各项默认值
 *        {
 *          symbol: ['\n', ':'],
 *          keys: ['uid', 'sec_uid']
 *          defaultItemValue: {
 *            type: 1
 *          }
 *        }
 * @return  [{ued: 123, sec_uid: 123},{ued: 123, sec_uid: 123},{ued: 123, sec_uid: 123}]
 */
export function interceptStringToArray(str, isHomeLoad, options) {
  try {
    let arr = []
    const { symbol } = options
    const cha = symbol.splice(0, 1)[0]
    arr = str.split(cha)
    // 递归字符
    if (symbol.length) {
      arr.map((item, index) => {
        arr[index] = interceptStringToArray(item, false, {
          symbol: [...symbol]
        })
      })
    }

    // 格式化完成后，处理keys
    if (isHomeLoad) {
      const { keys, defaultItemValue } = options
      // 当数据都截取完成后
      arr.map((item, index) => {
        if (!arr[index]) return []
        if (Array.isArray(arr[index])) {
          // 多维数组转一维数组
          arr[index] = item.flat()
        }

        // 根据keys，添加对应字段
        const obj = {}
        keys.forEach((key, iK) => {
          obj[key] = (Array.isArray(arr[index]) ? arr[index][iK] : arr[index]) || ''
        })
        arr[index] = Object.assign(obj, defaultItemValue || {})
      })
    }
    return arr
  } catch (error) {
    console.log(error)
  }
}

/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${rx()}${rx()}`
}

// -------------------下方方法Tag使用-------------------

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  // const params1 = route1.params || {}
  // const params2 = route2.params || {}
  // const query1 = route1.query || {}
  // const query2 = route2.query || {}
  // return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
  return route1.name === route2.name
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    // res = getHomeRoute(list)
  } else {
    const index = list.findIndex((item) => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

export const showTitle = (item) => {
  const { title } = item.meta
  if (!title) return
  return i18nRender(title)
}

export const getRouteTitleHandled = (route) => {
  const router = { ...route }
  const meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem)
  const pageTitle = showTitle(handledRoute, vm)
  const resTitle = pageTitle ? `${defaultSettings.title} - ${pageTitle}` : defaultSettings.title
  window.document.title = resTitle
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  const len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = (list) => {
  localStorage.tagNaveList = JSON.stringify(list)
}

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  const newList = [...list]
  if (newList.findIndex((item) => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  // const routeMetched = route.matched
  // let res = routeMetched.filter(item => {
  //   return item.meta === undefined || !item.meta.hideInBread
  // }).map(item => {
  //   const meta = { ...item.meta }
  //   if (meta.title && typeof meta.title === 'function') {
  //     meta.__titleIsFunction__ = true
  //     meta.title = meta.title(route)
  //   }
  //   const obj = {
  //     icon: (item.meta && item.meta.icon) || '',
  //     name: item.name,
  //     meta: meta
  //   }
  //   return obj
  // })
  // res = res.filter(item => {
  //   return !item.meta.hideInMenu
  // })
  // return [...res]

  function getRouters(data) {
    let childArr = []
    if (data.name === 'index') {
      // 如果为首页，则获取所有父节点
      childArr = asyncRouters.filter((route) => route.parentId === 0)
      childArr = childArr.map((item) => {
        if (item?.meta?.hideInMenu) return
        return {
          path: `/${item.path || item.name}`,
          name: item.name,
          icon: item.icon || item?.meta?.icon || '',
          title: item.title || item?.meta?.title || '',
          meta: item.meta
        }
      })
    } else {
      const routes = asyncRouters.filter((route) => route.name === data.name)
      if (routes.length) {
        const childs = asyncRouters.filter((route) => route.parentId === routes[0].id)
        childArr = childs.map((item) => {
          if (item?.meta?.hideInMenu) return
          return {
            path: `/${item.path || item.name}`,
            name: item.name,
            icon: item.icon || item?.meta?.icon || '',
            title: item.title || item?.meta?.title || '',
            meta: item.meta
          }
        })
      }
    }
    return childArr
  }

  // 获取递归路由数组
  const routeMetched = route.matched
  const res = routeMetched.map((item) => {
    const meta = { ...item.meta }
    const obj = {
      path: item.path,
      name: item.name,
      icon: item.icon || item?.meta?.icon || '',
      title: item.title || item?.meta?.title || '',
      meta,
      children: getRouters(item) || []
    }
    return obj
  })
  return [...res]
}

/**
 * 递归复制合并参数
 * @param {Object} data 原对象
 * @param {Object} target 新对象
 * @returns 合并对象
 */
export function deepMerge(data, target) {
  for (const key in target) {
    data[key] = isObject(data[key]) ? deepMerge(data[key], target[key]) : (data[key] = target[key])
  }
  return data
}
