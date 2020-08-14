<style scoped lang="scss">
$breakpoint-small: 620px;

#shortnr-el {
  h1 {
    color: #fff;
    padding: 10pt 0;
    text-align: center;
  }

  > * {
    padding: 0;
    max-width: 800px;
    margin: 0px auto;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    input {
      flex: 1;
      padding: 5px;
      display: block;
      width: 100%;
      border-radius: 5px 0 0 5px;
      border: 0px;
      padding: 15px;
    }
    button {
      margin-left: 4px;
      border-radius: 0 5px 5px 0;
      border: 0px;
      background: #f1b31c;
      padding: 0 10px;
      &.loading {
        background: #ccc;
      }
    }
  }
  .error {
    background: #ffa7c0;
    color: #781e32;
    border: 3px solid #f00;
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
  }
  ul {
    li {
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      margin: 5px 0;
      border-radius: 4px;
      padding: 10px;
      div {
        padding: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        a,
        a:hover,
        a:visited {
          color: #1e50a0;
        }
        &.long {
              align-self: center;

          text-align: left;
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: 1%;
          @media (max-width: $breakpoint-small) {
            flex-basis: 100%;
          }
        }
        &.short {
          flex: 1 0;
          display: flex;
          justify-content: space-between center;
          .url {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1 0;
            text-align: left;
            align-self: center;
          }
          .copy {
            align-self: center;
            text-align: center;
            padding: 2px 10px;
            background: #92d3f5;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="shortnr-el">
    <h1>URL Shortener</h1>
    <form>
      <input v-model="inputValue" placeholder="Enter link here" data-url />
      <button
        v-on:click="handleCreateUrl"
        value="Shorten URL"
        v-bind:class="{ loading: loading }"
      >
        Shorten URL
      </button>
    </form>
    <div class="error" v-if="error">{{ this.error }}</div>
    <ul>
      <li v-for="item in this.urls" :key="item.code">
        <div class="long">
          <a :href="item.url">{{ item.url }}</a>
        </div>
        <div class="short">
          <a class="url" :href="item.code">{{ item.code }}</a>
          <a
            class="copy"
            href="#"
            v-on:click="copyToClipboard($event, item.code)"
            >Copy</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UrlEntry } from "../shared/rest";
import { fetchWrapper as fetch, config } from "./boundaries";
import { copyToClipboard } from "./clipboard";

@Component
export default class Shortnr extends Vue {
  public loading = false;
  public urls: UrlEntry[] = [];
  public inputValue = "";
  public error = "";

  async handleCreateUrl(event: Event) {
    event.preventDefault();

    if (this.loading) {
      return;
    }

    if (this.inputValue === "") {
      this.error = "Link cannot be empty";
      setTimeout(() => {
        this.error = "";
      }, 1000);

      return;
    }

    const payload = { url: this.inputValue };

    this.inputValue = "";
    this.loading = true;

    try {
      const response: Response = await fetch(config.URLSTORE_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 201) {
        const createdEntry = (await response.json()) as UrlEntry;
        this.urls.unshift(createdEntry);
      } else if (response.status === 503) {
        this.error = "Server is busy, try again later";
        setTimeout(() => {
          this.error = "";
        }, 1000);
      } else if (response.status === 400) {
        const message = (await response.json()) as { error: string };
        this.error = message.error;
        setTimeout(() => {
          this.error = "";
        }, 1000);
      } else {
        this.error = "Unexpected response!";
        setTimeout(() => {
          this.error = "";
        }, 1000);
      }
    } catch (e) {
      this.error = "Network error!";
      setTimeout(() => {
        this.error = "";
      }, 1000);
    } finally {
      this.loading = false;
    }
  }

  async mounted() {
    this.loading = true;
    try {
      const response: Response = await fetch(config.URLSTORE_URL);
      const json: Array<UrlEntry> = await response.json();
      this.urls = json;
    } catch (error) {
      this.error = "Network error";
    } finally {
      this.loading = false;
    }
  }

  copyToClipboard(event: Event, link: string) {
    event.preventDefault();
    alert(`Short URL ${link} copied to clipboard`);
    copyToClipboard(link);
  }
}
</script>
