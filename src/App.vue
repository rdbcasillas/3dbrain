<template>
  <div id="app">
    <Header2></Header2>
    <br>
    <br>
      <router-view></router-view>
  </div>
</template>

<script>
import Header2 from './components/Header2.vue'

export default {
  name: 'App',
  components: {
   Header2,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
