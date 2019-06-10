<template>
  <input placeholder="Add new todo" v-model="todoText" v-on:keyup.enter="add" />
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from "vue-property-decorator";
import nanoid from "nanoid";

import { TodoRecord } from "../types";

@Component
export default class TodoInput extends Vue {
  @Prop(Function) onAdd!: (newTodo: TodoRecord) => void;
  todoText = "";

  add() {
    const newTodo = {
      id: nanoid(),
      text: this.todoText,
      completed: false
    };
    this.onAdd(newTodo);
    this.todoText = "";
  }
}
</script>

<style scoped lang="scss">
input {
  background: inherit;
  border: none;
  border-bottom: #ddd 1px solid;
  color: inherit;
  margin-bottom: 15px;
  &:focus {
    outline: none;
  }
}
</style>
