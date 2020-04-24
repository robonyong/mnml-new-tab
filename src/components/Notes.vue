<template>
  <div class="notes-container">
    <h2>notes</h2>
    <quill-editor
      class="notes-editor"
      :content="notes"
      :options="editorOptions"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { quillEditor } from "vue-quill-editor";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "ts-debounce";

import * as storage from "../storage";

const updateNotes = debounce((notes: string) => {
  storage.set({ todoNotes: notes });
}, 1000);

@Component({
  components: {
    quillEditor
  }
})
export default class Notes extends Vue {
  notes: string = "";
  lastUpdated = Date.now();

  editorOptions = {
    theme: "snow",
    boundary: document.body,
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block", "link"],
        ["clean"]
      ],
      history: {
        delay: 500,
        userOnly: true
      }
    },
    placeholder: "Start jotting some notes",
    readOnly: false
  };

  mounted() {
    storage.get("todoNotes").then((storedNotes: any) => {
      this.notes = storedNotes;
    });
    storage.subscribe("todoNotes", (changes: any) => {
      if (this.notes !== changes && Date.now() - this.lastUpdated > 1000) {
        this.notes = changes;
      }
    });
  }

  onEditorChange({ html }: { html: string }) {
    this.lastUpdated = Date.now();
    this.notes = html;
    updateNotes(html);
  }
}
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
</style>
