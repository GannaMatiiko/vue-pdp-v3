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

  <h1>{{ this.groupId }} - {{ groupPosition }}</h1>

</template>

<script>
export default {
  props: ["groupData", "groupId", "groupPosition"],
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
          
          this.$emit('initInputChanges', this.defaultValue, this.groupId, this.groupPosition);
          // this.$store.dispatch('assignFormValueToPage', pageData);
      }
  },
  created() {
    this.$emit('initInputChanges', this.groupId, this.groupPosition);
  }
};
</script>