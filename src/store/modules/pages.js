export default {
    state() {
        return {
            savedPages: []
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
            state.savedPages.push({
                id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                urlName: payload
            })
        },
        renameUrl(state, payload) {
            for (let key in state.savedPages) {
                delete state.savedPages[key].isRenaming;
                if (state.savedPages[key].id === payload) {
                    state.savedPages[key].isRenaming = true;
                }
            }
        },
        onUrlRenameCompleted(state, payload) {
            let renamedObjectIndex = state.savedPages.findIndex(x => x.id == payload.id);
            state.savedPages[renamedObjectIndex].urlName = payload.newValue;
            delete state.savedPages[renamedObjectIndex].isRenaming;
        },
        removeUrl(state, payload) {
            state.savedPages.splice(payload, 1);
        }
    }
}