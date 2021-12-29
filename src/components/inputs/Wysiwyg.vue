<template>
  <label :for="name">Label is {{ label }}</label>
  <quill-editor
    :name="name"
    :required="isRequired !== null"
    :options="options"
    v-model:content="defaultValue"
    contentType="html"
    @focus="changeInputValue()"
  ></quill-editor>

  <div class="content ql-editor" v-html="defaultValue"></div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor,
  },
  props: ["groupData", "groupId", "groupPosition"],
  data() {
    return {
      options: {
        placeholder: "Enter something",
        theme: "snow",
      },
      label: this.groupData.label,
      name: this.groupData.name,
      isRequired: this.groupData.isRequired,
      defaultValue: this.groupData.default,
    };
  },
  methods: {
    changeInputValue() {
      this.$emit(
        "initInputChanges",
        { type: 'text', value: this.defaultValue },
        this.groupId,
        this.groupPosition
      );
    },
  },
  created() {
    this.$emit(
      "initInputChanges",
      { type: 'text', value: this.defaultValue },
      this.groupId,
      this.groupPosition
    );
  },
};
</script>