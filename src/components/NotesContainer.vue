<template>
  <div class="notes-container">
    <h2>notes</h2>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <font-awesome-icon icon="strikethrough" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <font-awesome-icon icon="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <font-awesome-icon icon="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.link() }"
          @click="commands.link"
        >
          <font-awesome-icon icon="link" />
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          <font-awesome-icon icon="grip-lines" />
        </button>

        <button class="menubar__button" @click="commands.undo">
          <font-awesome-icon icon="undo" />
        </button>

        <button class="menubar__button" @click="commands.redo">
          <font-awesome-icon icon="redo" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "ts-debounce";
import {
  Bold,
  Italic,
  Underline,
  Strike,
  HorizontalRule,
  CodeBlock,
  Link,
  History
} from "tiptap-extensions";

import * as storage from "../storage";

const updateNotes = debounce((notes: string) => {
  storage.set({ todoNotes: notes });
}, 500);

@Component({
  components: {
    Editor,
    EditorContent,
    EditorMenuBar,
    FontAwesomeIcon
  }
})
export default class NotesContainer extends Vue {
  notes: string = "";
  editor = new Editor({
    extensions: [
      new Bold(),
      new Italic(),
      new Underline(),
      new Strike(),
      new CodeBlock(),
      new Link(),
      new HorizontalRule(),
      new History()
    ],
    content: "",
    onUpdate: ({ getHTML }: { getHTML: () => string }) => {
      this.notes = getHTML();
      this.$nextTick(() => {
        updateNotes(this.notes);
      });
    }
  });

  beforeDestroy() {
    this.editor.destroy();
  }

  mounted() {
    storage.get("todoNotes").then((storedNotes: any) => {
      this.notes = storedNotes;
      this.$nextTick(() => {
        this.editor.setContent(this.notes);
      });
    });
    storage.subscribe("todoNotes", (changes: any) => {
      this.notes = changes;
      this.$nextTick(() => {
        this.editor.setContent(this.notes);
      });
    });
  }
}
</script>

<style scoped lang="scss">
.notes-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>

<style lang="scss">
.button {
  font-weight: bold;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(#000, 0.1);

  &:hover {
    background-color: rgba(#000, 0.15);
  }
}

.menubar {
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  background: #fff;
  border-bottom: 1px solid #ddd;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000;
    padding: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(#000, 0.05);
    }

    &.is-active {
      background-color: rgba(#000, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}

.editor__content {
  background: #fff;
  color: #000;
  padding: 10px;
  word-wrap: break-word;
  position: relative;

  * {
    caret-color: currentColor;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    &:focus {
      outline: none;
    }
  }

  pre {
    padding: 0.7rem 1rem;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 0.8rem;
    overflow-x: auto;

    code {
      display: block;
    }
  }

  p {
    margin: 1rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:focus {
      outline: none;
    }
  }

  p code {
    display: inline-block;
    padding: 0 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(#fff, 0.1);
    color: rgba(#000, 0.8);
  }

  ul,
  ol {
    padding-left: 1rem;
  }

  a {
    color: initial;
  }
}</style
>style>
