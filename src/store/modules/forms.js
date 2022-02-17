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
        async loadFormData({commit, rootGetters}) {            
            const userId = rootGetters.getUserId;
            const token = rootGetters.token;
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdGroups/${userId}.json?auth=` + token);
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch');
                throw error;
            }

            commit('initFormData', responseData);
        },
        async saveForm({commit, rootGetters}, payload) {
            const formGroupData = payload;
            const userId = rootGetters.getUserId;
            const token = rootGetters.token;
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdGroups/${userId}.json?auth=` + token, {
                method: 'POST',
                body: JSON.stringify(formGroupData),
            })
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch');
                throw error;
            }
            formGroupData.fbId = responseData.name;

            commit('addFormData', formGroupData);
        },
        updateForm(context, payload) {
            context.commit('updateFormData', payload);
        },
        async initDeletingGroup({commit, rootGetters}, id) {
            const userId = rootGetters.getUserId;
            const token = rootGetters.token;
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdGroups/${userId}/${id}.json?auth=` + token, {
                method: 'DELETE',
            })
            if (!response.ok) {
                const error = new Error('Failed to delete');
                throw error;
            }

            commit('deleteGroup', id);
        }
    },
    mutations: {
        initFormData(state, data) {
            state.formGroups = data;
        },
        addFormData(state, data) {
            state.formGroups[data.fbId] = data;
        },
        updateFormData(state, data) {
            let id = data.id;
            state.formGroups[id] = data.formGroup;
            localStorage.setItem("createdFormGroups", JSON.stringify(state.formGroups));
        },
        deleteGroup(state, id) {
            delete state.formGroups[id];
        }
    },
}