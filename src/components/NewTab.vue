<template>
  <div class="container">
    <TodoContainer />
    <Notes />
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notes from "./Notes.vue";
import Sidebar from "./Sidebar.vue";
import TodoContainer from "./TodoContainer.vue";

export default defineComponent({
  name: "NewTab",
  components: {
    Notes,
    Sidebar,
    TodoContainer,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  background: #333;
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;
  justify-content: space-around;
  > div {
    padding: 15px;
  }
}

::-webkit-scrollbar {
  background: #333;
}
</style>
