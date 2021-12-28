<template>
  <Draggable
    tag="transition-group"
    :component-data="{ name: 'flip-list' }"
    ghost-class="ghost"
    group="todoList"
    item-key="id"
    :list="items"
    @start="drag = true"
    @end="drag = false"
    @change="onChange"
    ><template #item="{ element, index }"
      ><TodoItem
        :id="element.id"
        :text="element.text"
        :completed="element.completed"
        :key="element.id"
        :onCheck="onCheck(index)"
        :onRemove="onRemove(index)"
    /></template>
  </Draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Draggable from "vuedraggable";

import TodoItem from "./TodoItem.vue";

import { TodoRecord } from "../types";

export default defineComponent({
  components: {
    TodoItem,
    Draggable,
  },
  props: {
    items: {
      readonly: true,
      required: true,
      default: [],
      type: Array as PropType<TodoRecord[]>,
    },
    onChange: {
      required: true,
      type: Function as PropType<(event: any) => void>,
    },
    onCheck: {
      required: true,
      type: Function as PropType<(index: number) => void>,
    },
    onRemove: {
      required: true,
      type: Function as PropType<(index: number) => void>,
    },
  },
});
</script>

<style scoped lang="scss">
.todo-list {
  min-height: 20px;
}
.flip-list-move {
  transition: transform 0.1s;
}
.ghost {
  opacity: 0.5;
}
</style>
