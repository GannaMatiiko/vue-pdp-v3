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
                    firebaseId: key,
                    id: responseData[key].id,
                    urlName: responseData[key].urlName,
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
                body: JSON.stringify(urlData),
            })
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch');
                throw error;
            }
            urlData.firebaseId = responseData.name;
            context.commit('storeNewUrl', urlData);
        },
        renameUrl(context, payload) {
            context.commit('renameUrl', payload.id);
            console.log('action on rename begin', payload.id)
        },
        async onUrlRenameCompleted(context, payload) {
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages/${payload.fbId}.json`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                const error = new Error('Failed to rename');
                throw error;
            }
            context.commit('onUrlRenameCompleted', payload);
            console.log('action on rename completed', payload)
        },
        async deleteUrl(context, id) {
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages/${id}.json`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                const error = new Error('Failed to delete');
                throw error;
            }
            context.commit('removeUrl', id);
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
                } else {
                    state.savedPages[key].disabled = true;
                }
            }
        },
        onUrlRenameCompleted(state, payload) {
            console.log('payload inside mutation rename completed', payload);
            let renamedObjectIndex = state.savedPages.findIndex(x => x.id == payload.id);
            state.savedPages[renamedObjectIndex].urlName = payload.urlName.replace(/\s+/g, "-").toLowerCase();

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
                        state.savedPages.forEach((page) => page.disabled = false)
                    }
                }
            }

        },
        removeUrl(state, payload) {
            const index = state.savedPages.findIndex(page => page.firebaseId === payload);
            if (index > -1) {
                state.savedPages.splice(index, 1);
            }
        }
    }
}