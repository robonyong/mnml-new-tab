<template>
  <div class="sidebar">
    <h1>{{ this.format(this.now, "HH:mm") }}</h1>
    <h2>
      {{ this.format(this.now, "dddd") }}<br />{{
        this.format(this.now, "MM/DD/YY")
      }}
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import { format } from "date-fns";

@Component
export default class Sidebar extends Vue {
  format = format;
  now = new Date();
  updateTimeInterval?: number;

  created() {
    this.updateTimeInterval = window.setInterval(
      () => (this.now = new Date()),
      1000
    );
  }

  beforeDestroy() {
    clearInterval(this.updateTimeInterval);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: right;
}
</style>
