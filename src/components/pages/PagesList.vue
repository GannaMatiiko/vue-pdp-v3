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

        <input type="text" v-else v-model.trim="renamingAlias" />
        <br>
        <span class="error error-label" v-if="page.hasError === 'empty'">Field shouldn't be empty</span>
        <span class="error error-label" v-if="page.hasError === 'notLatin'">Field should contain only Latin characters and numbers</span>
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
      let inputHasError = null;
      if (this.renamingAlias === '') {
        inputHasError = 'emptyInput';
      } else if (!/^[\w\s]+$/g.test(this.renamingAlias)) {
        inputHasError = 'notLatin'
      }
       else {
        inputHasError = false;
      }
      this.$store.dispatch("onUrlRenameCompleted", {
        id: id,
        newValue: this.renamingAlias,
        error: inputHasError
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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.page-list-item:last-child {
  margin-bottom: 0;
}
.error-label {
  position: absolute;
  bottom: -20px;
}
</style>