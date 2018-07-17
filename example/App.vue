<template>
  <div>
    <h1>timewheel</h1>
  </div>
</template>

<script>
import TimeWheel from '../src/index'

export default {
  mounted () {
    const timer = new TimeWheel()
    timer.add({
      duration: 1000,
      fn: function () {
        console.log(1000)
      }
    }).add({
      duration: 1250,
      fn: function () {
        console.log(1250)
      }
    }).add({
      duration: 2000,
      fn: function () {
        console.log(2000)
      }
    }).add({
      duration: 3000,
      fn: function () {
        console.log(3000)
      }
    })
    console.log(timer)
  }
}
</script>
