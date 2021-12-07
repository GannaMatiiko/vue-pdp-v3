export default {
    state() {
        return {
            formGroups: []
        }
    },
    getters: {
        getFormGroups(state) {
            return state.formGroups;
        }
    },
    actions: {
        saveForm(context, payload) {
            console.log(payload, 'inside actions');
            // here data will be sent to server

            const formGroupItem = {
                randomId: Math.floor(Date.now() * Math.random()),
                ...payload
            }

            context.commit('mutateFormData', formGroupItem);
        }
    },
    mutations: {
        mutateFormData(state, data) {
            state.formGroups.push(data)
        }
    },
}