<template>
  <div class="todo-item" :class="{ completed }">
    <div>
      <font-awesome-icon
        class="icon"
        size="xs"
        :icon="checkIcon"
        @mouseover="onMouseover"
        @mouseout="onMouseout"
        @click="onCheck"
      />
      &nbsp;
      {{ text }}
    </div>
    <font-awesome-icon
      class="icon"
      icon="trash-alt"
      size="xs"
      @click="onRemove"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    completed: {
      required: true,
      type: Boolean,
    },
    onCheck: {
      required: true,
      type: Function,
    },
    onRemove: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      isMousedOver: false,
    };
  },
  computed: {
    checkIcon: function (): string {
      return this.completed
        ? this.isMousedOver
          ? "square"
          : "check-square"
        : this.isMousedOver
        ? "check-square"
        : "square";
    },
  },
  methods: {
    onMouseover() {
      this.isMousedOver = true;
    },
    onMouseout() {
      this.isMousedOver = false;
    },
  },
});
</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #777;
  cursor: move;
  min-height: 20px;
  &.completed {
    text-decoration: line-through;
  }
  .icon {
    cursor: pointer;
  }
}

.todo-edit {
  cursor: text;
  background: inherit;
  border: none;
  color: inherit;
  &:focus {
    outline: none;
  }
}
</style>
