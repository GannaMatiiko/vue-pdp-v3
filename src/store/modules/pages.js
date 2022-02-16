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
        async loadPagesData({commit, rootGetters}) {
            // if (!getters.shouldUpdate) {
            //     return;
            // }
            
            // const userId = rootGetters.getUserId;
            const userId = localStorage.getItem('userId');
            const token = rootGetters.token;
            console.log('token on load', token);
            console.log('id on load', userId);
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages/${userId}.json?auth=` + token);
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
            commit('initPagesData', pages);
            commit('setFetchTimestamp');
        },
        async addUrl({commit, rootGetters}, payload) {
            const urlData = {
                urlName: payload,
                userId: rootGetters.getUserId,
                assignedFormValues: []
            }
            const userId = rootGetters.getUserId;
            console.log('userId when add', userId);
            const token = rootGetters.token;
            console.log('!!!!', userId, token);
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages/${userId}.json?auth=` + token, {
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
        async onUrlRenameCompleted({commit, rootGetters}, payload) {
            const userId = rootGetters.getUserId;
            const token = rootGetters.token;
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages/${userId}/${payload.fbId}.json?auth=` + token, {
                method: 'PUT',
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                const error = new Error('Failed to rename');
                throw error;
            }
            commit('onUrlRenameCompleted', payload);
        },
        async deleteUrl({commit, rootGetters}, id) {
            const userId = rootGetters.getUserId;
            const token = rootGetters.token;
            const response = await fetch(`https://vue-pdp-default-rtdb.europe-west1.firebasedatabase.app/createdPages/${userId}/${id}.json?auth=` + token, {
                method: 'DELETE',
            })
            if (!response.ok) {
                const error = new Error('Failed to delete');
                throw error;
            }
            commit('removeUrl', id);
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