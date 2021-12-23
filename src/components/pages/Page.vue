<template>
  <base-card>
    <div>Choose form group you want to use on this page</div>
    <div v-for="(form, index) in createdForms" :key="index">
      <input type="checkbox" :id="index" @change="addToChosen($event, index)" />
      <label :for="index">{{form.title}}</label>
    </div>
  </base-card>

  <base-card v-if="chosenIds && chosenIds.length > 0">
    <div v-for="group in chosenGroups" :key="group">
      <div v-for="groupData in group.inputsData" :key="groupData">
        Input type <strong> {{groupData.type}}</strong>
        <div v-if="groupData.type === 'text'">
          <Text :groupData="groupData" :pageName="pageName" @initInputChanges="onInitInputChanges"></Text>
        </div>
        <div v-if="groupData.type === 'textarea'">
          <Textarea :groupData="groupData" :pageName="pageName" @initInputChanges="onInitInputChanges"></Textarea>
        </div>
        <div v-if="groupData.type === 'image'">
          <Image :groupData="groupData" @initInputChanges="onInitInputChanges"></Image>
        </div>
        <div v-if="groupData.type === 'wysiwyg'">
          <Wysiwyg @initInputChanges="onInitInputChanges"></Wysiwyg>
        </div>
      </div>
    </div>
    <base-button @click="saveAssignedFormsToPage">Save</base-button>
  </base-card>

  <pre>{{ createdForms }}</pre>
  <div>Page name is {{ pageName }}</div>
  <br />
</template>

<script>
import Text from '../inputs/Text.vue';
import Textarea from '../inputs/Textarea.vue';
import Image from '../inputs/Image.vue';
import Wysiwyg from '../inputs/Wysiwyg.vue';
export default {
  components: {
    Text,
    Textarea,
    Image,
    Wysiwyg
  },
  data() {
    return {
      pageName: this.$route.params.url,
      chosenIds: [],
      savedValues: []
    };
  },
  computed: {
    createdForms() {
      return this.$store.getters.getFormGroups;
    },
    chosenGroups() {
      let arr = [];
      this.chosenIds.forEach(val => {
        if(this.createdForms[val] !== 'undefined') {
          arr.push(this.createdForms[val]);
        }
      })
      return arr;
    }
  },
  methods: {
    addToChosen(event, index) {
      if (event.target.checked) {
        this.chosenIds.push(index);
        this.$store.dispatch('assignFormValueToPage', this.pageName);
      } else {
        let indexToRemove = this.chosenIds.indexOf(index);
        this.chosenIds.splice(indexToRemove, 1);
      }
    },
    onInitInputChanges(value) {
      console.log('value inside parent', value);
      this.savedValues.push(value);
    },
    saveAssignedFormsToPage() {
      // const pageData = {

      // }
      console.log('сохраненные значения', this.savedValues)
    }
  }
};
</script>