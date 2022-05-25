<template>
  <div class="tags-nav">
    <div class="close-con">
      <a-dropdown style="margin-top: 7px">
        <a-button size="small" type="default">
          <a-icon type="close-circle" style="font-size: 18px" />
        </a-button>
        <a-menu slot="overlay" @click="handleTagsOption">
          <a-menu-item key="close-all">关闭所有</a-menu-item>
          <a-menu-item key="close-others">关闭其他</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <ul v-show="visible" :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }" class="contextmenu">
      <li v-for="(item, key) of menuList" @click="handleTagsOption({ key })" :key="key">{{ item }}</li>
    </ul>
    <div class="btn-con left-btn">
      <a-button size="small" type="default" @click="handleScroll(240)">
        <a-icon type="left" style="font-size: 18px" />
      </a-button>
    </div>
    <div class="btn-con right-btn">
      <a-button size="small" type="default" @click="handleScroll(-240)">
        <a-icon type="right" style="font-size: 18px" />
      </a-button>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{ left: tagBodyLeft + 'px' }">
        <!-- <transition-group name="taglist-moving-animation"> -->
        <a-tag
          :visible="showTag"
          v-for="(item, index) in list"
          ref="tagsPageOpened"
          :key="`tag-nav-${index}`"
          :name="item.name"
          :data-route-item="item"
          @close="handleClose(item)"
          @click.native="handleClick(item)"
          :closable="item.name !== $store.getters['ruleRouterName'] && !isCurrentTag(item)"
          :color="isCurrentTag(item) ? 'blue' : ''"
          @contextmenu.prevent.native="contextMenu(item, $event)"
        >
          {{ showTitleInside(item) }}
        </a-tag>
        <!-- </transition-group> -->
      </div>
    </div>
  </div>
</template>

<script>
import { showTitle, routeEqual } from '@/utils/util'
import beforeClose from '@/router/before-close'
export default {
  name: 'TagsNav',
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showTag: true,
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: '关闭其他',
        all: '关闭所有'
      }
    }
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
  methods: {
    handlescroll(e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleTagsOption({ key }) {
      const type = key
      if (type.includes('all')) {
        // 关闭所有，除了home
        const res = this.list.filter((item) => item.name === this.$store.getters['ruleRouterName'])
        this.$emit('on-close', res, 'all')
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        const res = this.list.filter(
          (item) => routeEqual(this.currentRouteObj, item) || item.name === this.$store.getters['ruleRouterName']
        )
        this.$emit('on-close', res, 'others', this.currentRouteObj)
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj)
        }, 100)
      }
    },
    handleClose(current) {
      if (current.meta && current.meta.beforeCloseName && current.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[current.meta.beforeCloseName]).then((close) => {
          if (close) {
            this.close(current)
          }
        })
      } else {
        this.close(current)
      }
    },
    close(route) {
      const res = this.list.filter((item) => !routeEqual(route, item))
      this.$emit('on-close', res, undefined, route)
    },
    handleClick(item) {
      this.$emit('input', item)
    },
    showTitleInside(item) {
      return showTitle(item, this)
    },
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item)
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByRoute(route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (routeEqual(route, item.$attrs['data-route-item'])) {
            const tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    },
    contextMenu(item, e) {
      if (item.name === this.$store.getters['ruleRouterName']) {
        return
      }
      this.visible = true
      const offsetLeft = this.$el.getBoundingClientRect().left
      this.contextMenuLeft = e.clientX - offsetLeft + 10
      this.contextMenuTop = e.clientY - 64
    },
    closeMenu() {
      this.visible = false
    }
  },
  watch: {
    $route(to) {
      this.getTagElementByRoute(to)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route)
    }, 200)
  }
}
</script>

<style lang="less">
@import './tags-nav.less';
</style>
