<template>
  <div id="app">
    <NewTab />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faCheck,
  faCheckSquare,
  faExternalLinkAlt,
  faGlassCheers,
  faGripLines,
  faLink,
  faRedo,
  faSquare,
  faTimes,
  faTrashAlt,
  faUndo,
  faUnderline,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "normalize.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
require("vue-foldable/dist/vue-foldable.css");

import NewTab from "./components/NewTab.vue";

library.add(
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faCheck,
  faCode,
  faLink,
  faGripLines,
  faUndo,
  faRedo,
  faCheckSquare,
  faExternalLinkAlt,
  faGlassCheers,
  faSquare,
  faTimes,
  faTrashAlt,
  faVideo
);

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

.small {
  font-size: 0.75em;
}

a {
  color: #ddd;
  &:hover {
    color: initial;
  }
}
</style>
