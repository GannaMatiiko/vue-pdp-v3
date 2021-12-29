<template>
  <base-card>
    <div>Choose form group you want to use on this page</div>
    <div v-for="(form, index) in createdForms" :key="index">
      <input type="checkbox" :id="index" @change="addToChosen($event, index)" />
      <label :for="index">{{ form.title }}</label>
    </div>
  </base-card>

  <base-card v-if="chosenIds && chosenIds.length > 0">
    <div v-for="(group, groupIndex) in chosenGroups" :key="group">
      {{ groupIndex }} h
      <div
        v-for="(groupData, groupDataIndex) in group.inputsData"
        :key="groupData"
      >
        Input type <strong> {{ groupData.type }}</strong> index inside form
        group {{ groupDataIndex }}
        <div v-if="groupData.type === 'text'">
          <Text
            :groupData="groupData"
            :groupId="this.chosenIds[groupIndex]"
            :groupPosition="groupDataIndex"
            @initInputChanges="onInitInputChanges"
          ></Text>
        </div>
        <div v-if="groupData.type === 'textarea'">
          <Textarea
            :groupData="groupData"
            :groupId="this.chosenIds[groupIndex]"
            :groupPosition="groupDataIndex"
            @initInputChanges="onInitInputChanges"
          ></Textarea>
        </div>
        <div v-if="groupData.type === 'image'">
          <Image
            :groupData="groupData"
            :groupId="this.chosenIds[groupIndex]"
            :groupPosition="groupDataIndex"
            @initInputChanges="onInitInputChanges"
          ></Image>
        </div>
        <div v-if="groupData.type === 'wysiwyg'">
          <Wysiwyg
            :groupData="groupData"
            @initInputChanges="onInitInputChanges"
            :groupId="this.chosenIds[groupIndex]"
            :groupPosition="groupDataIndex"
          ></Wysiwyg>
        </div>
      </div>
    </div>
  </base-card>
  <base-card>
    <base-button @click="saveAssignedFormsToPage" to="/pages-list"
      link>Save</base-button>
  </base-card>

  <pre>{{ createdForms }}</pre>
  <div>Page name is {{ pageName }}</div>
  <br />
</template>

<script>
import Text from "../inputs/Text.vue";
import Textarea from "../inputs/Textarea.vue";
import Image from "../inputs/Image.vue";
import Wysiwyg from "../inputs/Wysiwyg.vue";
export default {
  components: {
    Text,
    Textarea,
    Image,
    Wysiwyg,
  },
  data() {
    return {
      pageName: this.$route.params.url,
      chosenIds: [],
      assignedFormValues: {},
    };
  },
  computed: {
    createdForms() {
      return this.$store.getters.getFormGroups;
    },
    chosenGroups() {
      let arr = [];
      this.chosenIds.forEach((val) => {
        if (this.createdForms[val] !== "undefined") {
          arr.push(this.createdForms[val]);
        }
      });
      return arr;
    },
  },
  methods: {
    addToChosen(event, index) {
      if (event.target.checked) {
        this.chosenIds.push(index);
        this.$store.dispatch("assignFormValueToPage", this.pageName);
      } else {
        let indexToRemove = this.chosenIds.indexOf(index);
        this.chosenIds.splice(indexToRemove, 1);
        delete this.assignedFormValues[index];
      }
    },
    onInitInputChanges(value, groupId, groupPosition) {
      console.log("value inside parent", value, groupId, groupPosition);
      console.log(this.assignedFormValues, "DOOO");

      console.log(
        Object.prototype.hasOwnProperty.call(this.assignedFormValues, groupId),
        "has own prop"
      );

      if (!Object.prototype.hasOwnProperty.call(this.assignedFormValues, groupId)) {
        this.assignedFormValues[groupId] = {
          [groupPosition]: value,
        };
      } else {
        this.assignedFormValues[groupId][groupPosition] = value;
      }

      console.log(Object.keys(this.assignedFormValues[groupId]).length);
      console.log(this.assignedFormValues, "OBJJJJJJJJ");
    },
    saveAssignedFormsToPage() {
      console.log("BEFORE SAVE", this.assignedFormValues);
      const pageData = {
        pageName: this.pageName,
        assignedFormValues: this.assignedFormValues
      }
      this.$store.dispatch('assignFormValueToPage', pageData);
    },
  },
};
</script>