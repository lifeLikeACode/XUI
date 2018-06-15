export default {
  methods: {
    touchstart (event) {
      this.swiping = true
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
      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : ''
    },
    touchend (event) {

    }
  }
}