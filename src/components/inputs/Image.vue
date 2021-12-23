<template>
  <input type="file" accept="image/png, image/jpeg" @change="onChange" />
  <br />
  <img v-if="item.imageUrl" :src="item.imageUrl" class="image" />
</template>

<script>
export default {
  props: ["groupData"],
  data() {
    return {
      item: {
        image: null,
        imageUrl: null,
      },
    };
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.item.imageUrl = URL.createObjectURL(file);

      this.$emit('initInputChanges', this.item.imageUrl);
    },
  },
};
</script>

<style scoped>
.image {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>