<template>
  <div class="input-type">
    <label :for="name">Label is  {{ label }}</label>
    <textarea
      :id="name"
      :name="name"
      :required="isRequired !== null"
      :value="defaultValue ? defaultValue : ''"
      @input="defaultValue = $event.target.value"
      @change="changeInputValue()"
    ></textarea>
    <b>Default value is {{ defaultValue }}</b>
    <br />
    <span v-if="isRequired !== null">Field is required!*</span>
  </div>

  <pre>{{ groupData }}</pre>
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
      changeInputValue(data) {
        console.log(data);
          this.$emit('initInputChanges', this.defaultValue);
      }
  }
};
</script>