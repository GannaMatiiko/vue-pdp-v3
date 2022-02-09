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
        async loadPagesData(context) {
            const response = await fetch('https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages.json');
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch');
                throw error;
            }
            
            const pages = [];
            for (let key in responseData) {
                const page = {
                    id: responseData[key].id,
                    urlName: responseData[key].urlName
                }
                pages.push(page);
            }
            context.commit('initPagesData', pages);
        },
        async addUrl(context, payload) {
            const urlData = {
                id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                urlName: payload,
                assignedFormValues: []
            }
            const response = await fetch('https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages.json', {
                method: 'POST',
                body: JSON.stringify(urlData)
            })
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch');
                throw error;
            }
            context.commit('storeNewUrl', urlData);
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
        initPagesData(state, pages) {
            state.savedPages = pages;
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
        storeNewUrl(state, urlData) {
            state.savedPages.push(urlData);
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

            for (let key in state.savedPages) {
                delete state.savedPages[key].hasError;
                if (state.savedPages[key].id === payload.id) {
                    if (payload.error == 'emptyInput') {
                        state.savedPages[key].hasError = 'empty';
                        return;
                    } else if (payload.error == 'notLatin') {
                        state.savedPages[key].hasError = 'notLatin';
                        return;
                    }
                    else {
                        state.savedPages[key].hasError = false;
                        delete state.savedPages[renamedObjectIndex].isRenaming;
                        localStorage.setItem("createdPages", JSON.stringify(state.savedPages));
                    }
                }
            }
            
        },
        removeUrl(state, payload) {
            state.savedPages.splice(payload, 1);
            localStorage.setItem("createdPages", JSON.stringify(state.savedPages));
        }
    }
}