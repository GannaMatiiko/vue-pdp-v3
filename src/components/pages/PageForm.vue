<template>
  <form>
    <div class="form-control">
      <label for="url" v-if="isShown">Enter page alias</label>
      <input type="text" id="url" autocomplete="off" v-model="url" />
    </div>
    <!-- <base-button v-if="isShown" @click.prevent="addUrl">Add alias</base-button> -->
    <base-button v-if="isShown" @click.prevent="addUrl">Add alias</base-button>
  </form>
</template>

<script>
// import { Form, Field, ErrorMessage  } from 'vee-validate';
export default {
  // components: {
  //   Form,
  //   Field,
  //   ErrorMessage 
  // },
  props: {
    urlProp: {
      type: String,
      required: false,
      default: null
    },
    isShown: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isValidForm: true,
      url: '',
      // url: {
      //   val: '',
      //   isValid: true
      // },
    };
  },
  methods: {
    validateInput() {
      if (this.url.val === '') {
        this.url.isValid = false;
      }
    },
    addUrl() {
      // this.validateInput();

      // if(!this.url.isValid) {
      //   return;
      // }
      this.$store.dispatch("addUrl", this.url);
      this.url = '';
    },
    onSubmit(values) {
      console.log(values);
      this.$store.dispatch("addUrl", values);
    },
    validateUrl(value) {
      this.isValid = true;
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // All is good
      // return true;
      this.isValidForm = true;
      
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.error {
  color: red;
}
p {
  margin: 0;
}
</style>




