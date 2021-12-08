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
        saveForm(context, payload) {
            console.log(payload, 'inside actions');
            // here data will be sent to server
            
            context.commit('mutateFormData', payload);
        },
        initDeletingGroup(context, id) {
            context.commit('deleteGroup', id);
        }
    },
    mutations: {
        mutateFormData(state, data) {
            let randomId = Math.floor(Date.now() * Math.random());
            state.formGroups[randomId] = data;
        },
        deleteGroup(state, id) {
            delete state.formGroups[id];
        }
    },
}