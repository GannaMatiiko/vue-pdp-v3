export default {
    state() {
        return {
            savedPages: [],
            lastFetch: null
        }
    },
    getters: {
        getCreatedPages(state) {
            return state.savedPages;
        },
        shouldUpdate(state) {
            const lastFetch = state.lastFetch;
            if (!lastFetch) {
                return true;
            }
            const currentTimeStamp = new Date().getTime();
            // for caching fetched pages for 1 min
            return (currentTimeStamp - lastFetch) / 1000 > 60;
        }
    },
    actions: {
        async loadPagesData(context) {
            if (!context.getters.shouldUpdate) {
                return;
            }
            
            const response = await fetch('https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages.json');
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch');
                throw error;
            }

            const pages = [];
            for (let key in responseData) {
                const page = {
                    fbId: key,
                    urlName: responseData[key].urlName,
                }
                pages.push(page);
            }
            context.commit('initPagesData', pages);
            context.commit('setFetchTimestamp');
        },
        async addUrl({commit, rootGetters}, payload) {
            const urlData = {
                urlName: payload,
                userId: rootGetters.getUserId,
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
            urlData.fbId = responseData.name;
            commit('storeNewUrl', urlData);
        },
        renameUrl(context, fbId) {
            context.commit('renameUrl', fbId);
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
        setFetchTimestamp(state) {
            state.lastFetch = new Date().getTime();
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
        renameUrl(state, fbId) {
            for (let key in state.savedPages) {
                delete state.savedPages[key].isRenaming;
                if (state.savedPages[key].fbId === fbId) {
                    state.savedPages[key].isRenaming = true;
                } else {
                    state.savedPages[key].disabled = true;
                }
            }
        },
        onUrlRenameCompleted(state, payload) {
            let renamedObjectIndex = state.savedPages.findIndex(x => x.fbId == payload.fbId);
            state.savedPages[renamedObjectIndex].urlName = payload.urlName.replace(/\s+/g, "-").toLowerCase();

            for (let key in state.savedPages) {
                delete state.savedPages[key].hasError;
                if (state.savedPages[key].fbId === payload.fbId) {
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
            const index = state.savedPages.findIndex(page => page.fbId === payload);
            if (index > -1) {
                state.savedPages.splice(index, 1);
            }
        }
    }
}