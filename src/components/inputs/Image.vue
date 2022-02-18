<template>
  <label :for="name">{{ label }}<span v-if="isRequired !== 'false'" class="required">* {{isRequired}}</span></label>
  <input
    :name="name"
    :required="isRequired !== 'false'"
    type="file"
    accept="image/png, image/jpeg"
    @change="changeInputValue($event)"
  />
  <br />
  <img v-if="item.imageUrl" :src="item.imageUrl" :width="imageWidthHeight" :height="imageWidthHeight" class="image" />
  {{ groupData }} image group data
</template>

<script>
export default {
  props: ["groupData", "groupId", "groupPosition"],
  data() {
    return {
      item: {
        image: null,
        imageUrl: null,
      },
      label: this.groupData.label,
      name: this.groupData.name,
      isRequired: this.groupData.isRequired,
      imageSize: this.groupData.previewSize,
    };
  },
  computed: {
    imageWidthHeight() {
      if (this.imageSize === 'small') {
        return 150
      } else if (this.imageSize === 'medium') {
        return 300
      } else if (this.imageSize === 'large') {
        return 450
      } else {
        return 300
      }
    }
  },
  methods: {
    changeInputValue(e) {
      const file = e.target.files[0];
      this.item.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
      this.$emit(
        "initInputChanges",
        { link: this.item.imageUrl, imageSize: this.imageSize },
        this.groupId,
        this.groupPosition
      );
    },
  },
  created() {
    this.$emit(
      "initInputChanges",
      { type: 'image', link: this.item.imageUrl, imageSize: this.imageSize },
      this.groupId,
      this.groupPosition
    );
  },
};
</script>

<style scoped>
.image {
  object-fit: cover;
  /* width: 100%;
  height: 100%; */
}
</style>