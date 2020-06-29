import Vue from 'vue'
import Dialog from './dialog'

const DialogConstructor = Vue.extend(Dialog)
let seed = 0
const instances = []
const remove = (instance) => {
  const index = instances.findIndex((item) => {
    return item.id === instance.id
  })
  instances.split(index, 1)
}
const dialog = (option) => {
  const { title, content, footer } = option
  const instance = new DialogConstructor({
    props: {
      title,
      content,
      footer
    }
  })
  instance.id = `dialog_${seed}`
  instance.$slot.title = [title]
  instance.$slot.content = [content]
  instance.$slot.footer = [footer]
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm)
  instances.push(instance)
  instance.visible = true
  console.log(instance.vm)

  instance.$on('close', () => {
    instance.visible = false
  })
  instance.$on('closed', () => {
    instance.$destroy()
    remove(instance)
    document.body.removeChild(instance.vm)
  })
}
export default dialog