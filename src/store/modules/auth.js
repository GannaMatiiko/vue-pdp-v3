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
        },
        isAuthenticated(state) {
            return !!state.token;
        }
    },
    actions: {
        async login(context, payload) {
            return context.dispatch('auth', {
                ...payload,
                mode: 'login'
            })
        },
        async signup(context, payload) {
            return context.dispatch('auth', {
                ...payload,
                mode: 'signup'
            })
        },
        async auth(context, payload) {
            const mode = payload.mode;
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgYTInbbAH8YuIdi6kHZfHNYtSxRUkBU0';
            if (mode === 'signup') {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgYTInbbAH8YuIdi6kHZfHNYtSxRUkBU0';
            }
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            })

            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to authenticate, check your login data');
                throw error;
            }

            const expiresIn = +responseData.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('userId', responseData.localId);
            localStorage.setItem('tokenExpiration', expirationDate);

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            })
        },
        tryLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                context.commit('setUser', {
                    token: token,
                    userId: userId,
                    tokenExpiration: null
                })
            }
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            context.commit('setUser', {
                token: null,
                userId: null,
                tokenExpiration: null
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