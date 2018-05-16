
import button from './components/button/index'
const components = [
  button
]
const install = (Vue) => {
  if (install.installed) return false
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  button
}
