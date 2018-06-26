
import button from './components/button/index'
import swiper from './components/swiper/index'
import swiperItem from './components/swiperItem/index'
import dialog from './components/dialog/index'
import icon from './components/icon/index'
import groupButton from './components/groupButton/index'
import row from './components/row/index'
import col from './components/col/index'
const components = [
  button,
  swiper,
  swiperItem,
  dialog,
  icon,
  groupButton,
  row,
  col
]
const install = (Vue) => {
  if (install.installed) return false
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
document.body.addEventListener('touchstart', function () {})
export default {
  install,
  button,
  swiper,
  swiperItem,
  dialog,
  icon,
  groupButton,
  row,
  col
}
