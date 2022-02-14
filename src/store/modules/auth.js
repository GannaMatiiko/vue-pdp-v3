export default {
    state() {
        return {
            userId: null,
            token: null,
            tokenExpiration: null
        }
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        }
    },
    actions: {
        async login(context, payload) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgYTInbbAH8YuIdi6kHZfHNYtSxRUkBU0', {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    retunSecureToken: true
                })
            })

            const responseData = await response.json();
            if (!response.ok) {
                console.log(responseData);
                const error = new Error(responseData.message || 'Failed to authenticate, check your login data');
                throw error;
            }

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            })
        },
        async signup(context, payload) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgYTInbbAH8YuIdi6kHZfHNYtSxRUkBU0', {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    retunSecureToken: true
                })
            })

            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to authenticate, check your login data');
                throw error;
            }

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            })
        }
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;
        }
    }
}