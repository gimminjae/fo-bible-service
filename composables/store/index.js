// import { createStore } from 'vuex'
//
// export const store = createStore({
//     state() {
//         return {
//             loggedInMember: {}
//         }
//     },
//     mutations: {
//         setLoggedInMember(state, member) {
//             state.loggedInMember = member
//         },
//         clearLoggedInMember(state) {
//             state.loggedInMember = null
//         }
//     },
//     actions: {
//         login({ commit }, member) {
//             // Save member to local storage
//             localStorage.setItem('loggedInMember', JSON.stringify(member))
//             commit('setLoggedInMember', member)
//         },
//         logout({ commit }) {
//             // Remove member from local storage
//             localStorage.removeItem('loggedInMember')
//             commit('clearLoggedInMember')
//         },
//         checkLocalStorage({ commit }) {
//             // Check if member is already logged in from previous session
//             const loggedInMember = localStorage.getItem('loggedInMember')
//             if (loggedInMember) {
//                 commit('setLoggedInMember', JSON.parse(loggedInMember))
//             }
//         }
//     }
// })


import {defineStore} from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        member: {

        }
    }),
    mutations: {
        setMember(member) {
            localStorage.setItem('member', JSON.stringify(member))
        },
    },
    actions: {
        setMember(member) {
            console.log('setMember')
            localStorage.setItem('member', JSON.stringify(member))
        },
        login({commit}, member) {
            // Save member to local storage
            localStorage.setItem('loggedInMember', JSON.stringify(member))
            commit('setLoggedInMember', member)
        },
        logout() {
            // Remove member from local storage
            localStorage.removeItem('member')
        },
        checkLocalStorage({commit}) {
            // Check if member is already logged in from previous session
            const loggedInMember = localStorage.getItem('loggedInMember')
            if (loggedInMember) {
                commit('setLoggedInMember', JSON.parse(loggedInMember))
            }
        }
    },
})