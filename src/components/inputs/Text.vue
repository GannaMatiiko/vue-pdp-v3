<template>
  <div class="input-type">
    <label :for="name">Label is {{ label }}</label>
    <input
      :id="name"
      :name="name"
      :required="isRequired !== null"
      :value="defaultValue ? defaultValue : ''"
      @input="defaultValue = $event.target.value"
      @change="changeInputValue()"
    />
    <span v-if="isRequired !== null">Field is required!*</span>
  </div>

  <pre>{{ this.defaultValue }}</pre>

</template>

<script>
export default {
  props: ["groupData", "pageName"],
  data() {
    return {
      label: this.groupData.label,
      name: this.groupData.name,
      isRequired: this.groupData.isRequired,
      defaultValue: this.groupData.default,
      oldValue: this.groupData.default,
    };
  },
  methods: {
      changeInputValue() {
          
          this.oldValue = this.defaultValue;
          console.log("а что в олд велью?", this.oldValue);
          // const pageData = {

          //     pageName: this.pageName,
          //     value: this.defaultValue
          // }
          this.$emit('initInputChanges', this.defaultValue);
          // this.$store.dispatch('assignFormValueToPage', pageData);
      }
  },
  watch: {
    defaultValue() {
      console.log('OHH, VALUE CHANGED');

    }
  },
  created() {
    this.oldValue = this.defaultValue;
    this.$emit('initInputChanges', this.oldValue);
  }
};
</script>