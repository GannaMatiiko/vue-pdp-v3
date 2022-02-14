<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <Form @submit="submitForm" :validation-schema="schema">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <Field type="email" id="email" name="authEmail" v-model="email" />
          <ErrorMessage
            name="authEmail"
            class="error formgroup-error"
          ></ErrorMessage>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <Field
            type="password"
            id="password"
            name="authPassword"
            v-model="password"
          />
          <ErrorMessage
            name="authPassword"
            class="error formgroup-error"
          ></ErrorMessage>
        </div>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </Form>
    </base-card>
  </div>
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
  data() {
    const schema = yup.object({
      authEmail: yup
        .string()
        .required("This field is required")
        .email("Enter valid email"),
      authPassword: yup
        .string()
        .required("This field is required")
        .min(6, "Password min length 6 characters"),
    });
    return {
      email: "",
      password: "",
      mode: "login",
      schema,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonCaption() {
      return this.mode === "login" ? "Signup instead" : "Login instead";
    },
  },
  methods: {
    async submitForm() {
      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      }

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload)
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
        this.error = null;
    }
  },
};
</script>