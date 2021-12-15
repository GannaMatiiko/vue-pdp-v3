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
export default {
  props: {
    isShown: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isValidForm: true,
      url: '',
    };
  },
  methods: {
    addUrl() {
      this.$store.dispatch("addUrl", this.url);
      this.url = '';
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




