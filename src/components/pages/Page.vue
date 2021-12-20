<template>
  <pre>{{ createdForms }}</pre>
  <base-card>
    {{ pageName }}
    <br>

    <base-card>
      <div>Choose form group you want to use on this page</div>
      <div v-for="(form, index) in createdForms" :key="index">
        <input type="checkbox" :id="index" @change="addToChosen($event, index)">
        <label :for="index">{{form.title}}</label>
      </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    </base-card>

  </base-card>

  <base-card>
    <div v-for="group in chosenGroups" :key="group">
      {{group}}
    </div>
  </base-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pageName: this.$route.params.url,
      chosenIds: [],
    };
  },
  computed: {
    createdForms() {
      return this.$store.getters.getFormGroups;
    },
  },
  methods: {
    addToChosen(event, index) {
      if (event.target.checked) {
        this.chosenIds.push(index);
      }
    },
  },
};
</script>