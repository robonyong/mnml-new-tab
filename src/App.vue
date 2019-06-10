<template>
  <div id="app">
    <NewTab />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faSquare,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import NewTab from "./components/NewTab.vue";
import "normalize.css";

library.add(faCheckSquare, faSquare, faTrashAlt);

@Component({
  components: {
    NewTab
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
  font-size: 18px;
  line-height: 1.5;
}
</style>
