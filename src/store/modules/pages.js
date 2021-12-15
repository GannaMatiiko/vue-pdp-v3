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
        },
        renameUrl(state, payload) {
            for (let key in state.savedPages) {
                delete state.savedPages[key].isRenaming;
            }
            state.savedPages[payload].isRenaming = true;
        },
        onUrlRenameCompleted(state, payload) {
            delete state.savedPages[payload.oldValue].isRenaming;
            // if (payload.oldValue !== payload.newValue) {
            //     delete Object.assign(state.savedPages, { [payload.newValue]: state.savedPages[payload.oldValue] })[payload.oldValue];
            // }

            if (payload.oldValue !== payload.newValue && state.savedPages[payload.oldValue]) {

                // let keyValues = Object.keys(state.savedPages);
                // let position = keyValues.indexOf(payload.oldValue);
                // console.log('desired index', position);
                // keyValues.splice(position, 1, payload.newValue); 


                // console.log('KEY VALUES', keyValues);
                // let newObj = Object.fromEntries(keyValues);
                // console.log(newObj);

                Object.defineProperty(state.savedPages, payload.newValue,
                    Object.getOwnPropertyDescriptor(state.savedPages, payload.oldValue));
                delete state.savedPages[payload.oldValue];


            }
        
        },
        removeUrl(state, payload) {
            delete state.savedPages[payload];
        }
    }
}