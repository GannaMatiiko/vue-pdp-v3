<template>
    created groups
    <pre>{{ createdForms}}</pre>
    <base-card>
        <h3>Created groups</h3>
        <div v-for="(form, index) in createdForms" :key="index">
            <div>
               {{form.title}} ({{ form.inputsData.length }}) index is {{ form.randomId }}
            </div>
        </div>
    </base-card>
</template>

<script>
export default {
    computed: {
        createdForms() {
            return this.$store.getters.getFormGroups;
        }
    }
}
</script>