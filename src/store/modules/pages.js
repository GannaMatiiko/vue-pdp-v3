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
        loadPagesData(context, payload) {
            context.commit('initPagesData', payload);
        },
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
        },
        assignFormValueToPage(context, payload) {
            context.commit('assignFormValueToPage', payload);
        }
    },
    mutations: {
        initPagesData(state, payload) {
            state.savedPages = payload;
        },
        assignFormValueToPage(state, payload) {
            console.log('PAGE DATA', payload);
            // state.savedPages.forEach(obj => {
            //     if (obj.urlName === payload) {
            //         console.log('Найдено совпадение', obj.urlName);
            //         obj.assignedFormValues.push(payload);
            //     }
            // });
        },
        storeNewUrl(state, payload) {
            state.savedPages.push({
                id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                urlName: payload,
                assignedFormValues: []
            });
            localStorage.setItem("createdPages", JSON.stringify(state.savedPages));
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
            state.savedPages[renamedObjectIndex].urlName = payload.newValue.replace(/\s+/g, "-").toLowerCase();
            delete state.savedPages[renamedObjectIndex].isRenaming;
            localStorage.setItem("createdPages", JSON.stringify(state.savedPages));
        },
        removeUrl(state, payload) {
            state.savedPages.splice(payload, 1);
            localStorage.setItem("createdPages", JSON.stringify(state.savedPages));
        }
    }
}