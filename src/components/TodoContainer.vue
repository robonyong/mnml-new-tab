<template>
  <div class="todo-container">
    <h2>todos</h2>
    <TodoInput :onAdd="addNewTodo" />
    <TodoList
      :items="todos"
      :onChange="onListDragUpdated('todos')"
      :onCheck="onCheck('todos')"
      :onRemove="removeTodo('todos')"
    />
    <h3>completed</h3>
    <TodoList
      :items="completedTodos"
      :onChange="onListDragUpdated('completedTodos')"
      :onCheck="onCheck('completedTodos')"
      :onRemove="removeTodo('completedTodos')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import TodoInput from "./TodoInput.vue";
import TodoList from "./TodoList.vue";

import * as storage from "../storage";

import { TodoRecord } from "../types";

// @ts-ignore
const checkCast = (input: any): T => input;

@Component({
  components: {
    TodoInput,
    TodoList
  }
})
export default class TodoContainer extends Vue {
  todos: TodoRecord[] = [];
  completedTodos: TodoRecord[] = [];

  created() {
    storage.get("todos").then((storedTodos?: any) => {
      const loadedTodos: TodoRecord[] = checkCast(storedTodos);
      this.todos = loadedTodos ? loadedTodos : [];
    });
    storage.subscribe("todos", (changes: any) => {
      const changedTodos: TodoRecord[] = checkCast(changes);
      this.todos = changedTodos ? changedTodos : [];
    });
    storage.get("completedTodos").then((storedTodos?: any) => {
      const loadedTodos: TodoRecord[] = checkCast(storedTodos);
      this.completedTodos = loadedTodos ? loadedTodos : [];
    });
    storage.subscribe("completedTodos", (changes: any) => {
      const changedTodos: TodoRecord[] = checkCast(changes);
      this.completedTodos = changedTodos ? changedTodos : [];
    });
  }

  addNewTodo(newTodo: TodoRecord) {
    this.todos.unshift(newTodo);
    storage.set({ todos: this.todos });
  }

  removeTodo(key: "todos" | "completedTodos") {
    return (index: number) => () => {
      this[key].splice(index, 1);
      storage.set({ [key]: this[key] });
    };
  }

  onCheck(key: "todos" | "completedTodos") {
    return (index: number) => () => {
      const toKey = key === "todos" ? "completedTodos" : "todos";
      const element = this[key].splice(index, 1)[0];
      const newElement = {
        ...element,
        completed: toKey === "todos" ? false : true
      };
      this[toKey].unshift(newElement);
      storage.set({ [key]: this[key], [toKey]: this[toKey] });
    };
  }

  onListDragUpdated(key: "todos" | "completedTodos") {
    return (event: any) => {
      if (event.added) {
        const element = {
          ...event.added.element,
          completed: key === "todos" ? false : true
        };
        this[key].splice(event.added.newIndex, 1, element);
      }
      storage.set({ [key]: this[key] });
    };
  }
}
</script>

<style scoped lang="scss">
.todo-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  text-align: left;
}
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
