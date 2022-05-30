import Vue from 'vue'
import VueI18n from 'vue-i18n'
import storage from 'store'
import moment from 'moment'

// default lang
import enUS from './lang/en-US'
import ZhCN from './lang/zh-CN'

Vue.use(VueI18n)

export const defaultLang = 'zh-CN'

const messages = {
  'zh-CN': {
    ...ZhCN
  },
  'en-US': {
    ...enUS
  }
}

const i18n = new VueI18n({
  silentFallbackWarn: true,
  silentTranslationWarn: true, // 关闭waring提示信息.目前不使用i18n，如果需要使用时，可以去除警告。可以查看页面哪些文字没有进行翻译
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

const loadedLanguages = [defaultLang]

function setI18nLanguage (lang) {
  i18n.locale = lang
  // request.headers['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    storage.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          const locale = msg.default
          i18n.setLocaleMessage(lang, locale)
          loadedLanguages.push(lang)
          moment.updateLocale(locale.momentName, locale.momentLocale)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

export function i18nRender (key) {
  return i18n.t(`${key}`)
}

export default i18n
