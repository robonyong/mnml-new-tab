<template>
  <div id="app">
    <mnml />
  </div>
</template>

<script>
import mnml from './components/mnml.vue'

export default {
  name: 'App',
  components: {
    mnml
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #333;
  color: #ddd;
  min-height: 100vh;
  padding: 30px;
}
</style>
