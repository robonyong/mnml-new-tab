<template>
  <Draggable
    tag="div"
    ghost-class="ghost"
    group="todoList"
    :list="items"
    @change="onChange"
  >
    <transition-group
      class="todo-list"
      type="transition"
      tag="div"
      :name="'flip-list'"
    >
      <TodoItem
        v-for="(item, idx) in items"
        :text="item.text"
        :completed="item.completed"
        :key="item.id"
        :onCheck="onCheck(idx)"
        :onRemove="onRemove(idx)"
      />
    </transition-group>
  </Draggable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Draggable from "vuedraggable";

import TodoItem from "./TodoItem.vue";

import { TodoRecord } from "../types";

// @ts-ignore
const checkCast = (input: any): T => input;

@Component({
  components: {
    TodoItem,
    Draggable
  }
})
export default class TodoList extends Vue {
  @Prop({ type: Array, default: [] }) readonly items!: TodoRecord[];
  @Prop(Function) onChange!: (event: any) => void;
  @Prop(Function) onCheck!: (index: number) => () => void;
  @Prop(Function) onRemove!: (index: number) => () => void;
}
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
