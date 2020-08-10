<template>
  <div id="shortnr-el">
    <input v-model="inputValue" placeholder="Enter link here" />
    <button v-on:click="handleCreateUrl" value="Shorten URL">
      Shorten URL
    </button>
    <ul>
      <li v-for="item in this.urls" :key="item.code">
        {{ item.url }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UrlEntry } from "../shared/rest";

@Component
export default class Shortnr extends Vue {
  public loading = false;
  public urls: UrlEntry[] = [];
  public inputValue = "";

  handleCreateUrl(): void {
    this.inputValue = "";
    this.loading = true;

    const payload = { url: this.inputValue };
    fetch("http://penguin.linux.test:9090/", {
      method: "post",
      body: JSON.stringify(payload)
    })
      .then((response: Response) => response.json())
      .then((createdEntry: UrlEntry) => {
        this.loading = false;
        this.urls.unshift(createdEntry);
      })
      .catch((e: Error) => {
        this.loading = false;
        console.error("Error while saving url", e);
      });
  }

  mounted() {
    this.loading = true;
    fetch("http://penguin.linux.test:9090/")
      .then((response: Response) => response.json())
      .then((json: Array<UrlEntry>) => {
        this.loading = false;
        this.urls = json;
      })
      .catch((error: Error) => {
        this.loading = false;
        console.error("Failed to fetch", error);
      });
  }
}
</script>
