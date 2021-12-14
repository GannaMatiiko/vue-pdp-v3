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
        renameUrl(context, payload) {
            context.commit('renameUrl', payload);
        },
        onUrlRenameCompleted(context, payload) {
            context.commit('onUrlRenameCompleted', payload);
        },
        deleteUrl(context, payload) {
            context.commit('removeUrl', payload);
        }
    },
    mutations: {
        storeNewUrl(state, payload) {
            state.savedPages[payload] = {};
            console.log(state, payload)
        },
        renameUrl(state, payload) {
            console.log(state, payload)
            state.savedPages[payload].isRenaming = true;
        },
        onUrlRenameCompleted(state, payload) {
            delete state.savedPages[payload.oldValue].isRenaming;
            if (payload.oldValue !== payload.newValue) {
                delete Object.assign(state.savedPages, { [payload.newValue]: state.savedPages[payload.oldValue] })[payload.oldValue];
            }
        },
        removeUrl(state, payload) {
            delete state.savedPages[payload];
        }
    }
}