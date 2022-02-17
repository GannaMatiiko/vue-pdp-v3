<template>
  <base-dialog :show="!!error" title="An error occured!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-card>
    <page-form></page-form>
  </base-card>
  <base-card>
    <h3>Pages List</h3>
    <pre>created pages {{ createdPages }}</pre>

    <base-card v-if="createdPages && Object.keys(createdPages).length > 0">
      <base-spinner v-if="isLoading"></base-spinner>
      <div
        v-for="(page, index) in createdPages"
        :key="index"
        class="page-list-item"
        v-else
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
            @click="renameAlias(page.fbId, page.urlName)"
            v-if="!page.isRenaming"
            :disabled="page.disabled"
          >
            Rename <font-awesome-icon :icon="['fas', 'edit']" />
          </base-button>

          <base-button @click="proccessRename(page.fbId)" v-else>
            Update <font-awesome-icon :icon="['fas', 'save']" />
          </base-button>

          <base-button @click="deleteAlias(page.fbId)">
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
      isLoading: false,
      error: null
    };
  },
  computed: {
    createdPages() {
      return this.$store.getters.getCreatedPages;
    },
  },
  methods: {
    async loadPages() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadPagesData');
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      
      this.isLoading = false;
    },
    renameAlias(fbId, urlName) {
      this.renamingAlias = urlName;
      this.$store.dispatch("renameUrl", fbId);
    },
    proccessRename(fbId) {
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
        fbId: fbId,
        urlName: this.renamingAlias,
        error: inputHasError
      });
    },
    deleteAlias(index) {
      this.$store.dispatch("deleteUrl", index);
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadPages();
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