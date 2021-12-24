<template>
  <base-card>
    <h3>Create your form group</h3>
    <form ref="formGroup">
      <div class="form-title">
        <input
          type="text"
          placeholder="Enter title for form group"
          v-model="formGroup.title"
        />
      </div>
      <base-button @click.prevent="addFormGroup">Add form group</base-button>
      <base-card
        v-for="(input, i) in formGroup.inputsData"
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
            <select v-model="input.type" @change="onTypeChange($event, input)">
              <option value disabled selected>Choose type</option>
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
          <div v-if="input.type !== 'image'">
            <span>Default value</span>
            <input type="text" v-model="input.default" />
          </div>
          <div v-if="input.type === 'image'">
            <span>Preview size</span>
            <select v-model="input.previewSize">
              <option value disabled selected>Choose image size</option>
              <option value="small">Small(150x150)</option>
              <option value="medium">Medium(300x300)</option>
              <option value="large">Large(450x450)</option>
            </select>
          </div>
        </div>
        <div>
          <base-button mode="outline" @click.prevent="deleteInput(i)"
            >Delete</base-button
          >
        </div>
      </base-card>
    </form>
    <base-button
      v-if="formGroup.inputsData.length > 0"
      @click="saveFormData()"
      to="/forms-list"
      link
    >
      <span>{{
        isEdit ? "Update and return to list" : "Save and go to list"
      }}</span>
    </base-button>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      requestedId: this.$route.params.id,
      isEdit: false,
      formGroup: {
        title: "",
        inputsData: [],
      },
    };
  },
  created() {
    if (this.requestedId) {
      this.isEdit = true;
      this.formGroup = this.$store.getters.getFormGroups[this.requestedId];
    }
  },
  methods: {
    addFormGroup() {
      const newFormFields = {
        label: "",
        name: "",
        type: "",
        isRequired: true,
        default: "",
        previewSize: "",
      };
      this.formGroup.inputsData.push(newFormFields);
    },
    onTypeChange(e, data) {
      if (data.type !== "image") {
        data.previewSize = "";
      }
    },
    deleteInput(index) {
      this.formGroup.inputsData.splice(index, 1);
    },
    saveFormData() {
      if (this.requestedId) {
        const payload = {
          formGroup: this.formGroup,
          id: this.requestedId,
        };
        this.$store.dispatch("updateForm", payload);
      } else {
        this.$store.dispatch("saveForm", this.formGroup);
        this.$refs.formGroup.reset();
      }
    },
  },
};
</script>

<style scoped>
.form-title {
  margin-bottom: 20px;
}
.form-input-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
}
</style>