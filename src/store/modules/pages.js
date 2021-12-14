export default {
    state() {
        return {
           savedPages: {}
        }
    },
    getters: {
        getCreatedPages(state) {
            return state.savedPages;
        },
    },
    actions: {
        addUrl(context, payload) {
            context.commit('storeNewUrl', payload);
        },
        editUrl(context, payload) {
            context.commit('updateUrl', payload);
        },
        deleteUrl(context, payload) {
            context.commit('removeUrl', payload);
        }
    },
    mutations: {
        storeNewUrl(state, payload) {
            state.savedPages[payload] = {
                id: payload,
                isEdited: false
            };
        },
        updateUrl(state, payload) {
            state.savedPages[payload].isEdited = true;
        },
        removeUrl(state, payload) {
            delete state.savedPages[payload];
        }
    }
}