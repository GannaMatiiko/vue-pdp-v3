<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
  components: {
    TheHeader
  },
  created() {
    const createdFormGroups = JSON.parse(localStorage.getItem('createdFormGroups'));
    if (createdFormGroups) {
         this.$store.dispatch('loadFormData', createdFormGroups); 
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
}
</style>
