<template>
  <div class="container">
    <TodoContainer />
    <Notes />
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Notes from "./Notes.vue";
import Sidebar from "./Sidebar.vue";
import TodoContainer from "./TodoContainer.vue";

@Component({
  components: {
    Notes,
    Sidebar,
    TodoContainer
  }
})
export default class NewTab extends Vue {}
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
