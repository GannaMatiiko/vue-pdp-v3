<template>
  created groups
  <pre>{{ createdForms }}</pre>

  <base-card>
    <h3>Created groups</h3>
    <div v-if="createdForms && Object.keys(createdForms).length > 0">
      <div v-for="(form, index) in createdForms" :key="index">
        <div>
          <router-link :to="`/fieldgroup-card/${index}`">
            {{ form.title }} ({{ form.inputsData.length }})
          </router-link>
          <base-button @click="deleteGroup(index)">Delete</base-button>
        </div>
      </div>
    </div>
    <div v-else>You haven't created any group yet</div>
  </base-card>
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

