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

type TodoKeys = "todos" | "completedTodos";

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

  mounted() {
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

  setupStorageSubs(key: TodoKeys) {
    storage.get(key).then((storedTodos: any = []) => {
      const loadedTodos: TodoRecord[] = checkCast(storedTodos);
      this[key] = loadedTodos;
    });

    storage.subscribe(key, (changes: any) => {
      const changedTodos: TodoRecord[] = checkCast(changes);
      this[key] = changedTodos ? changedTodos : [];
    });
  }

  addNewTodo(newTodo: TodoRecord) {
    this.todos.unshift(newTodo);
    storage.set({ todos: this.todos });
  }

  removeTodo(key: TodoKeys) {
    return (index: number) => () => {
      this[key].splice(index, 1);
      storage.set({ [key]: this[key] });
    };
  }

  onToggleTodo(toKey: TodoKeys, index: number, element: TodoRecord) {
    const updatedElement = {
      ...element,
      completed: !element.completed
    };

    this[toKey].splice(index, 1, updatedElement);
    this.$nextTick(() => {
      storage.set({ [toKey]: this[toKey] });
    });
  }

  onCheck(key: TodoKeys) {
    return (index: number) => () => {
      const toKey = key === "todos" ? "completedTodos" : "todos";
      const element = this[key].splice(index, 1)[0];
      this[toKey].unshift(element);
      this.onToggleTodo(toKey, 0, element);
      this.$nextTick(() => {
        storage.set({ [key]: this[key] });
      });
    };
  }

  onListDragUpdated(key: TodoKeys) {
    return (event: any) => {
      if (event.added) {
        this.onToggleTodo(key, event.added.newIndex, event.added.element);
      } else if (event.removed) {
        console.log(event);
        this.$nextTick(() => {
          storage.set({
            [key]: this[key].filter(({ id }) => id !== event.removed.element.id)
          });
        });
      }
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
