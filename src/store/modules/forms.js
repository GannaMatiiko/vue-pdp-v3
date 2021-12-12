export default {
    state() {
        return {
            formGroups: {}
        }
    },
    getters: {
        getFormGroups(state) {
            return state.formGroups;
        },
        getFormGroupById(state, id) {
            return state.formGroups[id];
        }
    },
    actions: {
        loadFormData(context, payload) {
            context.commit('initFormData', payload);
        },
        saveForm(context, payload) {
            console.log(payload, 'inside actions');
            // here data will be sent to server
            
            context.commit('addFormData', payload);
        },
        updateForm(context, payload) {
            console.log('inside update form action', payload);
            context.commit('updateFormData', payload);
        },
        initDeletingGroup(context, id) {
            context.commit('deleteGroup', id);
        }
    },
    mutations: {
        initFormData(state, data) {
            state.formGroups = data;
        },
        addFormData(state, data) {
            let randomId = Math.floor(Date.now() * Math.random());
            state.formGroups[randomId] = data;
            localStorage.setItem("createdFormGroups", JSON.stringify(state.formGroups));
        },
        updateFormData(state, data) {
            let id = data.id;
            console.log('id from mutation', id);
            console.log('state from mutation', state.formGroups);

            state.formGroups[id] = data.formGroup;
            localStorage.setItem("createdFormGroups", JSON.stringify(state.formGroups));
        },
        deleteGroup(state, id) {
            delete state.formGroups[id];
            localStorage.setItem("createdFormGroups", JSON.stringify(state.formGroups));
        }
    },
}