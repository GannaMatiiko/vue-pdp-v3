export default {
    state() {
        return {
           savedPages: {}
        }
    },
    getters: {
        getCreatedPages(state) {
            return state.savedPages;
        }
    },
    actions: {
        addUrl(context, payload) {
            context.commit('storeNewUrl', payload);
        },
        editUrl(context, payload) {
            context.commit('updateUrl', payload);
        }
    },
    mutations: {
        storeNewUrl(state, payload) {
            state.savedPages[payload] = {
                isEdited: false
            };
        },
        updateUrl(state, payload) {
            state.savedPages[payload].isEdited = true;
        }
    }
}