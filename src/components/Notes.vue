<template>
  <div class="notes-container">
    <h2>notes</h2>
    <quill-editor
      theme="snow"
      class="notes-editor"
      :content="notes"
      :options="editorOptions"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { debounce } from "ts-debounce";

import * as storage from "../storage";

const updateNotes = debounce((notes: string) => {
  storage.set({ todoNotes: notes });
}, 1000);

export default defineComponent({
  name: "NotesContainer",
  components: {
    "quill-editor": QuillEditor,
  },
  methods: {
    onEditorChange({ html }: { html: string }) {
      this.lastUpdated = Date.now();
      this.notes = html;
      updateNotes(html);
    },
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage.get("todoNotes").then((storedNotes: any) => {
      this.notes = storedNotes;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage.subscribe("todoNotes", (changes: any) => {
      if (this.notes !== changes && Date.now() - this.lastUpdated > 1000) {
        this.notes = changes;
      }
    });
  },
  data() {
    return {
      notes: "",
      lastUpdated: Date.now(),
      editorOptions: {
        theme: "snow",
        boundary: document.body,
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block", "link"],
            ["clean"],
          ],
          history: {
            delay: 500,
            userOnly: true,
          },
        },
        placeholder: "Start jotting some notes",
        readOnly: false,
      },
    };
  },
});
</script>

<style scoped lang="scss">
.notes-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.notes-editor {
  background: #ddd;
  color: #333;
}
</style>
<style lang="scss">
.ql-container.ql-snow {
  height: auto;
  font-size: inherit;
  font-family: inherit;
}
.ql-toolbar.ql-snow {
  background: #d1d5db;
}
.ql-editor.ql-before {
  color: #ddd;
}
</style>
