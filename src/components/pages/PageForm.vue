<template>
  <form @submit.prevent="addUrl">
    <div class="form-control">
      <label for="url" v-if="isShown">Enter page alias</label>
      <p v-if="!isLatin" class="error">Use only Latin letters!</p>
      <input type="text" id="url" autocomplete="off" v-model.trim="url" />
      <span class="error-wrapper" v-if="!isValidForm">
        <small
          class="error"
          v-for="(error, index) of v$.url.$errors"
          :key="index"
        >
          {{ error.$message }}
        </small>
      </span>

    </div>
    <base-button v-if="isShown">Add alias</base-button>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    isShown: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isValidForm: true,
      url: "",
      isLatin: true,
    };
  },
  validations() {
    return {
      url: { required },
    };
  },
  computed: {
    someComputed() {
      const params = this.v$.url.validatorName.$response;
      console.log(params);
      return params;
    },
  },
  methods: {
    addUrl() {
      this.v$.$touch();
      if (this.v$.$error) {
        this.isValidForm = false;
        return;
      }
      this.url = this.url.replace(/\s+/g, "-").toLowerCase();
      // check for Latin letters
      let pattern = /^[\w\s]+$/g;
      if (pattern.test(this.url)) {
        this.isLatin = true;
        this.$store.dispatch("addUrl", this.url);
        this.url = "";
        this.isValidForm = true;
      } else {
        this.isLatin = false;
      }
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




