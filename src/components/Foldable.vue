<template>
  <foldable class="custom-foldable">
    <slot></slot>

    <template
      align="center"
      class="custom-foldable-toggle small"
      v-slot:view-more="{ toggle, collapsed }"
      @click="toggle"
    >
      <div>
        {{ collapsed ? "+ Show more" : "- Collapse" }}
      </div>
    </template>
  </foldable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import foldable from "vue-foldable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "FoldableContainer",
  components: {
    foldable,
    "font-awesome-icon": FontAwesomeIcon,
  },
});
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
