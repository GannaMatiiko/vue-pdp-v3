<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/auth')
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background: rgb(55, 57, 59); */
  /* color: #fff; */
}
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}
.form-control {
  margin: 1rem 0;
  position: relative;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.input-type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.input-type input,
.input-type textarea {
  width: 100%;
}

.left-align {
  text-align: left;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea,
select {
  border: 1px solid #ccc;
  border-radius: 4px;
  font: inherit;
  margin-bottom: 10px;
}

input[type="radio"] {
  display: inline-block;
  width: auto;
  text-align: left;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}
span.error {
  color: red;
}
.required {
  color: red;
}
.form-title {
  margin-bottom: 20px;
  position: relative;
}
span.formgroup-error {
  position: absolute;
  bottom: -15px;
  right: 0;
  left: 0;
}
</style>
