
import button from './components/button/index'
import swiper from './components/swiper/index'
import swiperItem from './components/swiperItem/index'
const components = [
  button,
  swiper,
  swiperItem
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
  swiperItem
}
