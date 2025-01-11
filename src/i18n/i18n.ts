import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from 'src/locales/en/home.json'
import PRODUDUCT_EN from 'src/locales/en/product.json'
import HOME_VI from'src/locales/vi/home.json'
import PRODUCT_VI from'src/locales/vi/product.json'
export const locales = {
  en: 'English',
  vi: 'Tiếng việt'
} as const

export const resources = {
  en: {
   home : HOME_EN,
   product: PRODUDUCT_EN
  },
  vi:{
    home : HOME_VI,
    product: PRODUCT_VI
  }
}

export const defaultNS = 'home' // khi ko truyền NS vào thì thành NS default
i18n.use(initReactI18next).init({
   lng: 'vi',
   resources,
   ns : ['home', 'product'],// namespace
   fallbackLng: 'vi',// ko tìm được ngôn ngữ nào -> default = vi
   defaultNS,
   interpolation: {
      escapeValue: false
   }
})

export default i18n;