<template>
  <div class="container">
    <TodoContainer />
    <NotesContainer />
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NotesContainer from "./NotesContainer.vue";
import Sidebar from "./Sidebar.vue";
import TodoContainer from "./TodoContainer.vue";

@Component({
  components: {
    NotesContainer,
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
</style>
