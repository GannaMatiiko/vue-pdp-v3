<template>
  <div>
    <label :for="name">{{ label }}</label>
    <textarea
      :id="name"
      :name="name"
      :required="isRequired !== null"
      :value="defaultValue ? defaultValue : ''"
      @input="defaultValue = $event.target.value"
    ></textarea>
    <b>Default value is {{ defaultValue }}</b>
    <br />
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
};
</script>