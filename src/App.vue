<template>
  <div id="app">
    <NewTab />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import "normalize.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
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

export default defineComponent({
  name: "App",
  components: {
    NewTab,
  },
});
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
