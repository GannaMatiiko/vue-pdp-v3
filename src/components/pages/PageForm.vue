<template>
  <Form @submit="addUrl" :validation-schema="schema">
    <div class="form-title">
      <label for="url" v-if="isShown">Enter page alias</label>
      <Field
        type="text"
        name="pageAlias"
        id="url"
        autocomplete="off"
        v-model.trim="url"
      />
      <ErrorMessage
        name="pageAlias"
        class="formgroup-error error"
      ></ErrorMessage>
      <br>
      <span v-if="isPageNameExist" class="error custom-error">Page with this name already exist!</span>
    </div>
    <base-button v-if="isShown">Add alias</base-button>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const schema = yup.object().shape({
      pageAlias: yup
        .string()
        .required("This field is required")
        .matches(/^[\w\s]+$/g, "Use only Latin letters and numbers!"),
    });
    return {
      schema,
      isPageNameExist: false
    };
  },
  methods: {
    addUrl(values, { resetForm }) {
      this.url = this.url.replace(/\s+/g, "-").toLowerCase();
      let allPages = this.$store.getters.getCreatedPages;
      for (let page in allPages) {
        if (allPages[page].urlName === this.url) {
          this.isPageNameExist = true;
          return;
        } else {
          this.isPageNameExist = false;
        }
      }
      this.$store.dispatch("addUrl", this.url);
      resetForm();
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
.custom-error {
  display: inline-block;
  margin-bottom: 5px;
}
</style>




