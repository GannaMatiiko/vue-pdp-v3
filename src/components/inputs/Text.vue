<template>
  <div>
    Label is <label :for="name">{{ label }}</label>
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

  {{ groupData }}
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
    };
  },
  methods: {
      changeInputValue() {
          console.log(this.defaultValue);
          const pageData = {
              pageName: this.pageName,
              value: this.defaultValue
          }
          this.$store.dispatch('assignFormValueToPage', pageData);
      }
  }
};
</script>