<template>
  <div id="app">
    <Shortnr msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Shortnr from "./components/Shortnr.vue";

@Component({
  components: {
    Shortnr
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  background: #3f3f3f;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
