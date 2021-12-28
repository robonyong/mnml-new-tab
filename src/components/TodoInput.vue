<template>
  <input placeholder="Add new todo" v-model="todoText" v-on:keyup.enter="add" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import nanoid from "nanoid";

import { TodoRecord } from "../types";

export default defineComponent({
  data() {
    return {
      todoText: "",
    };
  },
  props: {
    onAdd: {
      required: true,
      type: Function as PropType<(newTodo: TodoRecord) => void>,
    },
  },
  methods: {
    add() {
      const newTodo = {
        id: nanoid(),
        text: this.todoText,
        completed: false,
      };
      this.onAdd(newTodo);
      this.todoText = "";
    },
  },
});
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
