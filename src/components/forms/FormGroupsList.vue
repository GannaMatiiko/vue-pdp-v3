<template>
  <base-card>
    <h3>Created groups</h3>
    <div v-if="createdForms && Object.keys(createdForms).length > 0">
      <div v-for="(form, index) in createdForms" :key="index">
        <div class="group-item">
          <router-link :to="`/edit/${index}`">
            <h2>{{ form.title }} ({{ form.inputsData.length }})</h2>
          </router-link>

          <base-button @click="deleteGroup(index)"
            >Delete <font-awesome-icon :icon="['fas', 'trash']"
          /></base-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text">
        You haven't created any group yet. Let's create a new one!
      </div>
      <base-button to="/add" link>Add form group</base-button>
    </div>
  </base-card>

    created groups
  <pre>{{ createdForms }}</pre>
</template>

<script>
export default {
  computed: {
    createdForms() {
      return this.$store.getters.getFormGroups;
    },
  },
  methods: {
    deleteGroup(id) {
      this.$store.dispatch("initDeletingGroup", id);
    },
  },
};
</script>


<style scoped>
.text {
  margin-bottom: 10px;
}
.group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
