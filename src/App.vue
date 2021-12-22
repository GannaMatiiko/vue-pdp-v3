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
    const createdFormGroups = JSON.parse(
      localStorage.getItem("createdFormGroups")
    );
    if (createdFormGroups) {
      this.$store.dispatch("loadFormData", createdFormGroups);
    }

    const createdPages = JSON.parse(localStorage.getItem("createdPages"));
    if (createdPages) {
      this.$store.dispatch("loadPagesData", createdPages);
    }
  },
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
  background: rgb(55, 57, 59);
  color: #fff;
}
.form-control {
  margin: 0.5rem 0;
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
</style>
