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
      <input v-if="!this.completed" v-model="todoText" class="todo-edit" />
      <span v-if="this.completed">{{text}}</span>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon
  }
})
export default class TodoItem extends Vue {
  @Prop(String) id!: string;
  @Prop(String) text!: string;
  @Prop(Boolean) completed!: boolean;
  @Prop(Function) onCheck!: () => void;
  @Prop(Function) onRemove!: () => void;
  todoText = this.text;
  isMousedOver = false;

  get checkIcon() {
    return this.completed
      ? this.isMousedOver ? "square" : "check-square"
      : this.isMousedOver ? "check-square" : "square";
  }

  onMouseover() {
    this.isMousedOver = true;
  }

  onMouseout() {
    this.isMousedOver = false;
  }
}
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
