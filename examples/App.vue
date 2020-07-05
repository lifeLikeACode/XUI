<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.addEventListener("touchstart", function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    var lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      function(event) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 100) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );
    // document.addEventListener("contextmenu", function(e) {
    //   e.preventDefault();
    // });
    document.addEventListener("gesturestart", function(event) {
      event.preventDefault();
    });
  }
};
</script>

<style lang="stylus" >
html * {
  padding: 0;
  margin: 0;
}
</style>
