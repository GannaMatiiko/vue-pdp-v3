<template>
  <div class="input-type">
    <label :for="name">{{ label }}<span v-if="isRequired !== null" class="required">*</span></label>
    <input
      :id="name"
      :name="name"
      :required="isRequired !== null"
      :value="defaultValue ? defaultValue : ''"
      @input="defaultValue = $event.target.value"
      @change="changeInputValue()"
    />
  </div>

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