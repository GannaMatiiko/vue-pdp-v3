<template>
  <div class="input-type">
    <label :for="name">Label is {{ label }}</label>
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
      this.$emit(
        "initInputChanges",
        { type: 'text', value: this.defaultValue },
        this.groupId,
        this.groupPosition
      );
    },
  },
  created() {
    this.$emit(
      "initInputChanges",
      { type: 'text', value: this.defaultValue },
      this.groupId,
      this.groupPosition
    );
  },
};
</script>