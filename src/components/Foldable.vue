<template>
  <foldable class="custom-foldable">
    <slot></slot>

    <div
      align="center"
      class="custom-foldable-toggle small"
      slot="view-more"
      slot-scope="{ toggle, collapsed }"
      @click="toggle"
    >
      {{ collapsed ? "+ Show more" : "- Collapse" }}
    </div>
  </foldable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import foldable from "vue-foldable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

@Component({
  components: {
    foldable,
    "font-awesome-icon": FontAwesomeIcon
  }
})
export default class Foldable extends Vue {}
</script>

<style lang="scss">
.custom-foldable {
  &-toggle {
    margin-top: 5px;
    color: #aaa;
    cursor: pointer;
  }
  &.vue-foldable {
    .vue-foldable-mask {
      background: linear-gradient(180deg, rgba(55, 55, 55, 0), #333);
      bottom: 18px;
    }
  }
  .vue-foldable-container {
    transition: max-height 0.3s;
  }
}
</style>
