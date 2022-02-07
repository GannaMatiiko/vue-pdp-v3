<template>
  <base-card>
    <page-form></page-form>
  </base-card>
  <base-card>
    <h3>Pages List</h3>
    created pages {{ createdPages }}

    <base-card v-if="createdPages && Object.keys(createdPages).length > 0">
      <div
        v-for="(page, index) in createdPages"
        :key="index"
        class="page-list-item"
      >
        <router-link :to="`/page/${page.urlName}`" v-if="!page.isRenaming">{{
          page.urlName
        }}</router-link>

        <input type="text" v-else v-model="renamingAlias" />

        <div>
          <base-button
            @click="renameAlias(page.id, page.urlName)"
            v-if="!page.isRenaming"
          >
            Rename <font-awesome-icon :icon="['fas', 'edit']" />
          </base-button>

          <base-button @click="proccessRename(page.id)" v-else>
            Update <font-awesome-icon :icon="['fas', 'save']" />
          </base-button>

          <base-button @click="deleteAlias(index)">
            Delete <font-awesome-icon :icon="['fas', 'trash']" />
          </base-button>
        </div>
      </div>
    </base-card>
    <div v-else>No created pages</div>
  </base-card>

  Created pages
  <pre>
  {{ createdPages }}
</pre
  >
</template>

<script>
import PageForm from "./PageForm.vue";
export default {
  components: {
    PageForm,
  },
  data() {
    return {
      renamingAlias: "",
    };
  },
  computed: {
    createdPages() {
      return this.$store.getters.getCreatedPages;
    },
  },
  methods: {
    renameAlias(id, urlName) {
      this.renamingAlias = urlName;
      this.$store.dispatch("renameUrl", id);
    },
    proccessRename(id) {
      this.$store.dispatch("onUrlRenameCompleted", {
        id: id,
        newValue: this.renamingAlias,
      });
    },
    deleteAlias(index) {
      this.$store.dispatch("deleteUrl", index);
    },
  },
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