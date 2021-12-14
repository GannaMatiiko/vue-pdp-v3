<template>
  <base-card>
    {{ pageName }}
    <br>
    <!-- <page-form  :isShown="false" ></page-form> -->

    <input type="text" v-model.trim="pageObject.id">
        <base-button @click="initEditAlias(pageObject)" v-if="!isEdit">
            Update <font-awesome-icon :icon="['fas', 'save']"/>
          </base-button>
    <br>

    this page is {{ pageObject}}
    <input type="text" v-model="pageObject.id" v-if="isEdit">

  </base-card>
</template>

<script>
// import PageForm from "./PageForm.vue";
export default {
  components: {
    // PageForm,
  },
  data() {
    return {
      pageName: this.$route.params.url,
      isEdit: false,
      pageObject: {}
    };
  },
  created() {
    if (this.pageName) {
     
      const pages = this.$store.getters.getCreatedPages;
      console.log(pages);
      this.pageObject = pages[this.pageName]
    }
  },
  methods: {
      initEditAlias(obj) {
        //    this.isEdit = true;
        const pageValues = {
            oldValue: this.pageName,
            newValue: obj.id
        }
        console.log('VALUES', pageValues);
          this.$store.dispatch('editUrl', pageValues);
      }
  }
};
</script>