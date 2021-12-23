<template>
  <base-card>
    <div>Choose form group you want to use on this page</div>
    <div v-for="(form, index) in createdForms" :key="index">
      <input type="checkbox" :id="index" @change="addToChosen($event, index)" />
      <label :for="index">{{form.title}}</label>
    </div>
  </base-card>

  <base-card v-if="chosenIds && chosenIds.length > 0">
    <div v-for="(group,i) in chosenGroups" :key="group">
      {{i}} h 
      <div v-for="(groupData,j) in group.inputsData" :key="groupData">
        Input type <strong> {{groupData.type}}</strong>
        <div v-if="groupData.type === 'text'">
          <Text :groupData="groupData" :groupId="this.chosenIds[i]" :groupPosition="j" @initInputChanges="onInitInputChanges"></Text>
        </div>
        <div v-if="groupData.type === 'textarea'">
          <Textarea :groupData="groupData" @initInputChanges="onInitInputChanges"></Textarea>
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
      savedValues: [],
      obj: {
        // groupId:[

        // ]
      },
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
        delete this.obj[index];
      }
    },
    onInitInputChanges(value, groupId, groupPosition) {
      console.log('value inside parent', value, groupId, groupPosition);
      //this.savedValues.push(value);
  console.log( this.obj, 'DOOO' )    

    console.log(Object.prototype.hasOwnProperty.call(this.obj, groupId),  'has own prop')


      if (!Object.prototype.hasOwnProperty.call(this.obj, groupId)) {
        this.obj[groupId] = {
          [groupPosition]: value
        }
      } else {
        this.obj[groupId][groupPosition] = value;
      }

      

console.log( Object.keys(this.obj[groupId]).length )

     // if (this.obj[groupId])
      //this.obj[groupId][groupPosition] = value;

      //console.log(this.obj, this.obj[groupId], 'THIS OBJ')

      console.log(this.obj, 'OBJJJJJJJJ')
    },
    saveAssignedFormsToPage() {
      // const pageData = {

      // }
      //console.log('сохраненные значения', this.savedValues)



      console.log('BEFORE SAVE', this.obj)
    }
  }
};
</script>