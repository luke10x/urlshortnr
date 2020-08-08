<template>
  <div id="shortnr-el">
    <p>davai</p>
    <button v-on:click="createShortUrl">Add 1</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Shortnr extends Vue {
  handleCreateUrl(): void {
    console.log("handle create url");
  }
}
</script>
