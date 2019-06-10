<template>
  <div class="notes-container">
    <h2>notes</h2>
    <textarea
      ref="textarea"
      placeholder="Start taking notes"
      v-model="notes"
      v-on:input="onInput"
    />
  </div>
</template>

<script lang="ts">
import autosize from "autosize";
import { Component, Prop, Vue } from "vue-property-decorator";
import { debounce } from "ts-debounce";

import * as storage from "../storage";

const updateNotes = debounce((notes: string) => {
  storage.set({ todoNotes: notes });
}, 500);

@Component
export default class NotesContainer extends Vue {
  notes: string = "";

  mounted() {
    autosize(this.$refs.textarea);
    storage.get("todoNotes").then((storedNotes: any) => {
      this.notes = storedNotes;
      this.$nextTick(() => {
        autosize.update(this.$refs.textarea);
      });
    });
    storage.subscribe("todoNotes", (changes: any) => {
      this.notes = changes;
    });
  }

  onInput() {
    updateNotes(this.notes);
  }
}
</script>

<style scoped lang="scss">
.notes-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  text-align: left;

  textarea {
    overflow: scroll;
  }
}
</style>
