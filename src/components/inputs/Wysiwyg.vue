<template>
  <quill-editor
    :options="options"
    v-model:content="editorContent" contentType="html" @focus="changeInputValue()" 
  ></quill-editor>

<div class="content ql-editor" v-html="editorContent"></div>

</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor, 
  },
  data() {
    return {
      options: {
        placeholder: "Enter something",
        theme: "snow",
      },
      editorContent: "",
    };
  },
  methods: {
    changeInputValue() {
      console.log('CHANGED!', this.editorContent)

      this.$emit('initInputChanges', this.editorContent);
    }
  }
};
</script>