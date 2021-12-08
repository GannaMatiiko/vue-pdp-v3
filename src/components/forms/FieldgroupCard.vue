<template>
  Inside card {{ requestedId }}

  form groups
  <pre> {{ selectedGroup }} </pre>

  <base-card>
    <h3>You can edit your form group</h3>
    <form ref="formGroup">
      <div class="form-title">
        <input
          type="text"
          placeholder="Enter title for form group"
          v-model="selectedGroup.title"
        />
      </div>
      <hr />
      <div
        v-for="(input, i) in selectedGroup.inputsData"
        :key="i"
        class="form-input-group"
      >
        <div>
          <div>
            <span>Field label*</span>
            <input type="text" v-model="input.label" />
          </div>
          <div>
            <span>Field name*</span>
            <input type="text" v-model="input.name" />
          </div>
          <div>
            <span>Field type*</span>
            <select v-model="input.type">
              <option value="" disabled selected>Choose type</option>
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="image">Image</option>
              <option value="wysiwyg">WYSIWYG</option>
              <option value="group">Group</option>
              <option value="repeater">Repeater</option>
            </select>
          </div>
          <div>
            <span>Required?</span>
            <input type="radio" value="true" v-model="input.isRequired" />
            <input type="radio" value="false" v-model="input.isRequired" />
          </div>
          <div>
            <span>Default value</span>
            <input type="text" v-model="input.default" />
          </div>
          <div v-if="input.type === 'image'">
            <span>Preview size</span>
            <select v-model="input.previewSize">
              <option value="" disabled selected>Choose image size</option>
              <option value="small">Small(150x150)</option>
              <option value="medium">Medium(300x300)</option>
              <option value="large">Large(450x450)</option>
            </select>
          </div>
        </div>
        <div>
          <base-button mode="outline" @click.prevent="deleteInput(i)">
            Delete
          </base-button>
        </div>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      requestedId: this.$route.params.id,
      selectedGroup: null,
    };
  },
  created() {
    this.selectedGroup = this.$store.getters.getFormGroups[this.requestedId];
  },
  methods: {
    deleteInput(id) {
        console.log(id);
      this.selectedGroup = this.selectedGroup.inputsData.splice(id, 1);
    },
  },
};
</script>

<style scoped>
.form-input-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 2px solid #b4b3b6;
}
</style>