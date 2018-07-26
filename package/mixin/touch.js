export default {
  methods: {
    touchstart (event) {
      this.direction = ''
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
    },
    touchmove (event) {
      const touch = event.touches[0]
      this.moveX = touch.clientX
      this.moveY = touch.clientY
      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : ''
      // scroll
    },
    touchend (event) {

    }
  }
}
