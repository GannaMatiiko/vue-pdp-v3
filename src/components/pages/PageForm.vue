<template>
  <form>
    <div class="form-control">
      <label for="url" v-if="isShown">Enter page alias</label>
      <input type="text" id="url" autocomplete="off" v-model.trim="url" />
      <p v-if="!isLatin" class="error">Use only Latin letters!</p>
    </div>
    <base-button v-if="isShown" @click.prevent="addUrl">Add alias</base-button>
  </form>
</template>

<script>
export default {
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
  methods: {
    addUrl() {
      // check for Latin letters
      let pattern = /^[A-Za-z0-9]+$/;
      if (pattern.test(this.url)) {
        console.log(" latin");
        this.isLatin = true;
        this.url = this.url.replace(/\s+/g, "-").toLowerCase();
        this.$store.dispatch("addUrl", this.url);
        this.url = "";
      } else {
        console.log("not latin");
        this.isLatin = false;
      }
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




