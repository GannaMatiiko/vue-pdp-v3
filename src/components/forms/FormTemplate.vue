<template>
  <base-card>
    <h3>Create your form group</h3>
    <Form ref="formGroup" @submit="saveFormData">
      <div class="form-title">
        <div class="formgroup-title">Enter form group title<span class="required">*</span></div>
        <Field
          type="text"
          name="formGroupName"
          rules="required"
          v-model="formGroup.title"
        />
        <br>
        <ErrorMessage name="formGroupName" class="error formgroup-error" />
      </div>
      <div class="base-button" @click="addFormGroup">Add form group</div>
      <base-card
        v-for="(input, i) in formGroup.inputsData"
        :key="i"
        class="form-input-group"
      >
        <div class="form-input-group-inner">
          <div>
            <span class="field-descr">Field label<span class="required">*</span></span>
            <Field type="text" :name="'fieldLabel' + i" v-model="input.label" rules="required"/>
            <ErrorMessage :name="'fieldLabel' + i" class="error field-error" />
          </div>
          <div>
            <span class="field-descr">Field name<span class="required">*</span></span>
            <Field type="text" :name="'fieldName' + i" v-model="input.name" rules="required"/>
            <ErrorMessage :name="'fieldName' + i" class="error field-error" />
          </div>
          <div>
            <span class="field-descr">Field type<span class="required">*</span></span>
            <Field :name="'fieldType' + i" as="select" v-model="input.type" @change="onTypeChange($event, input)" rules="required">
              <option value disabled selected>Choose type</option>
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="image">Image</option>
              <option value="wysiwyg">WYSIWYG</option>
              <option value="group">Group</option>
              <option value="repeater">Repeater</option>
            </Field>
            <ErrorMessage :name="'fieldType' + i" class="error field-error" />
          </div>
          <div>
            <span class="field-descr">Required?</span>
            <input type="radio" value="true" v-model="input.isRequired" />
            <input type="radio" value="false" v-model="input.isRequired" />
          </div>
          <div v-if="input.type !== 'image'">
            <span class="field-descr">Default value</span>
            <input type="text" v-model="input.default" />
          </div>
          <div v-if="input.type === 'image'">
            <span class="field-descr">Preview size<span class="required">*</span></span>
            <Field :name="'previewSize' + i" as="select" v-model="input.previewSize" rules="required">
              <option value disabled selected>Choose image size</option>
              <option value="small">Small(150x150)</option>
              <option value="medium">Medium(300x300)</option>
              <option value="large">Large(450x450)</option>
            </Field>
            <ErrorMessage :name="'previewSize' + i" class="error field-error" />
          </div>
        </div>
        <div>
          <base-button mode="outline" @click.prevent="deleteInput(i)"
            >Delete</base-button
          >
        </div>
      </base-card>
      <base-button
        v-if="formGroup.inputsData.length > 0"
      >
        <span>{{
          isEdit ? "Update and return to list" : "Save and go to list"
        }}</span>
      </base-button>
    </Form>
  </base-card>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
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
    saveFormData(values) {
      console.log('values', values);

      if (this.requestedId) {
        const payload = {
          formGroup: this.formGroup,
          id: this.requestedId,
        };
        this.$store.dispatch("updateForm", payload);
      } else {
        this.$store.dispatch("saveForm", this.formGroup);
      }
      this.$router.push('/forms-list');
    },
  },
};
</script>

<style scoped>
.formgroup-title {
  margin-bottom: 10px;
}
.form-input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.form-input-group-inner {
  text-align: left;
}
.field-descr {
  display: inline-block;
  width: 105px;
}
.base-button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  max-height: 50px;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}
.base-button:hover,
.base-button:active {
  background-color: #270041;
  border-color: #270041;
}
span.field-error {
  margin-left: 10px;
}
</style>