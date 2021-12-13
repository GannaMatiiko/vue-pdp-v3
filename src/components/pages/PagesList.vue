<template>
  <base-card>
    <page-form></page-form>
  </base-card>
  <base-card>
    <h3>Pages List</h3>
    created pages {{ createdPages }}
    <base-card>
      <div v-for="(page, index) in createdPages" :key="index" class="page-list-item">
        <router-link :to="`/page/${index}`">{{ index }}</router-link>
        <page-form  :isShown="false" v-if="page.isEdited"></page-form>
        <div>
          <base-button @click="editAlias(index)" v-if="!page.isEdited">
            Edit <font-awesome-icon :icon="['fas', 'edit']"/>
          </base-button>
          
          <base-button @click="editAlias" v-else-if="page.isEdited">
            Update <font-awesome-icon :icon="['fas', 'save']" />
          </base-button>

          <base-button>
            Delete <font-awesome-icon :icon="['fas', 'trash']"/>
          </base-button>
        </div>
      </div>
    </base-card>
  </base-card>
</template>

<script>
import PageForm from "./PageForm.vue";
export default {
  components: {
    PageForm,
  },
  data() {
    return {
      
    }
  },
  computed: {
    createdPages() {
      return this.$store.getters.getCreatedPages;
    },
  },
  methods: {
    editAlias(index) {
      console.log(index);
      this.$store.dispatch('editUrl', index);
    }
  }
};
</script>

<style scoped>
.page-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.page-list-item:last-child {
  margin-bottom: 0;
}
</style>