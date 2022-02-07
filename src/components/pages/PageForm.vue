<template>
    <Form @submit="addUrl" :validation-schema="schema">
      <div class="form-control">
        <label for="url" v-if="isShown">Enter page alias</label>
        <!-- <p v-if="!isLatin" class="error">Use only Latin letters!</p> -->
        <Field
          type="text"
          name="pageAlias"
          id="url"
          autocomplete="off"
          v-model.trim="url"
        />
        <ErrorMessage name="pageAlias"></ErrorMessage>
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
      pageAlias: yup.string().required('This field is required and must contain only Latin characters'),
    });
    return {
      schema,
    };
  },
  methods: {
    addUrl(values, {resetForm}) {
      this.url = this.url.replace(/\s+/g, "-").toLowerCase();
      // check for Latin letters
      let pattern = /^[\w\s]+$/g;
      if (pattern.test(this.url)) {
        this.isLatin = true;
        this.$store.dispatch("addUrl", this.url);
        resetForm();
        // this.url = " ";
        // this.isValidForm = true;
      } else {
        this.isLatin = false;
      }
    },
    latin(value) {
      // if the field is empty
      value = value.replace(/\s+/g, "-").toLowerCase();
      if (!value) {
        return "This field is required";
      }
      // if the field is not a valid email
      const regex = /^[\w\s]+$/g;
      if (!regex.test(value)) {
        return "This field must contain only Latin letters";
      }
      // All is good
      return true;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 1rem 0;
  position: relative;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

p {
  margin: 0;
}
</style>




