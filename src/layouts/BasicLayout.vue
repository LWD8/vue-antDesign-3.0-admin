<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <!-- Ads end -->

    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <template v-slot:menuHeaderRender>
      <div>
        <logo-svg />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义
    -->
    <template v-slot:headerContentRender>
      <div class="header-content-box">
        <a-tooltip title="刷新页面" style="padding-top: 2px; margin-right: 40px">
          <a-icon type="reload" style="font-size: 18px; cursor: pointer" @click="windowReload" />
        </a-tooltip>
        <a-breadcrumb :routes="breadCrumbList">
          <template slot="itemRender" slot-scope="{ route }">
            <router-link :to="{name: route.name}">
              {{ route.title || route.meta.title }}
            </router-link>
          </template>
        </a-breadcrumb>
      </div>
    </template>

    <setting-drawer v-if="isDev" :settings="settings" @change="handleSettingChange">
      <div style="margin: 12px 0">This is SettingDrawer custom footer content.</div>
    </setting-drawer>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template v-slot:footerRender>
      <!-- <global-footer /> -->
    </template>
    <div class="layout-tags-nav-box">
      <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" />
    </div>
    <router-view />
  </pro-layout>
</template>

<script>
// 因为 SettingDrawer 过于灵活而且配合 umi-plugin-antd-theme 有严重的性能问题。
// 因此我们不建议在正式环境中使用 SettingDrawer，你需要人肉引入一下 SettingDrawer。预览网站中是通过 fetch:blocks 来添加的。
// https://v4-pro.ant.design/docs/layout-cn#settingdrawer
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import { i18nRender } from '@/locales'
import { mapState, mapMutations } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import TagsNav from './tagsNav.vue'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import LogoSvg from '../assets/logo.svg?inline'
import { routeEqual, getNewTagList } from '@/utils/util'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter,
    LogoSvg,
    TagsNav
  },
  data() {
    return {
      // end
      isDev: process.env.NODE_ENV === 'development' || process.env.VUE_APP_PREVIEW === 'true',

      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        openKeys: defaultSettings.openKeys,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.addRouters,
      breadCrumbList: (state) => state.app.breadCrumbList
    })
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  created() {
    const routes = this.mainMenu.find((item) => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      updateTheme(this.settings.primaryColor)
    }

    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
  },
  methods: {
    ...mapMutations(['setBreadCrumb', 'setTagNavList', 'addTag']),
    i18nRender,
    handleMediaQuery(val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse(val) {
      this.collapsed = val
    },
    handleSettingChange({ type, value }) {
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    },

    handleCloseTag(res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$store.getters['ruleRouterName'])
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleClick(item) {
      this.turnToPage(item)
    },
    windowReload() {
      this.$store.dispatch('setTimestamp', Date.parse(new Date()))
    }
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
