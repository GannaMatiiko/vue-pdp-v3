<template>
  <header>
    <nav class="nav-links">
      <router-link to="/"><font-awesome-icon :icon="['fas', 'home']" /> Home</router-link>
      <router-link v-if="isLoggedIn" to="/pages-list"><font-awesome-icon :icon="['fas', 'copy']" /> Pages</router-link>
      <div>
        <router-link v-if="isLoggedIn" to="/forms-list"><font-awesome-icon :icon="['fas', 'layer-group']" /> Created groups</router-link>
        <router-link v-if="isLoggedIn" to="/add"><font-awesome-icon :icon="['fas', 'plus']" /> Add form group </router-link>
      </div>
      <router-link v-if="!isLoggedIn" to="/auth">Login</router-link>
      <router-link v-if="isLoggedIn" to="/auth" @click="logout">Logout</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/');
    }
  }
}
</script>

<style scoped>
.nav-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7146eb;
  color: white;
  height: 100px;
  padding: 0 30px;
}
.nav-links a {
  color: white;
  text-decoration: none;
  background-color: #1c9db6;
  padding: 10px 10px;
  border-radius: 15px;
}
.nav-links a:nth-child(1) {
    margin-right: 20px;
}
</style>