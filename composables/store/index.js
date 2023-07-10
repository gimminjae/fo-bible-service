import {defineStore} from 'pinia'

export const useStore = defineStore('member', {
    state: () => ({
        member: {
            memId: '',
            nickname: '',
            createDateTime: '',
            role: ''
        }
    }),
    mutations: {
        setMember(member) {
            // localStorage.setItem('member', JSON.stringify(member))
        },
    },
    actions: {
        setMember(member) {
            console.log(this.member)
            // localStorage.setItem('member', JSON.stringify(member))
            this.member.memId = member.memId
            this.member.createDateTime = member.createDateTime
            this.member.nickname = member.nickname
            this.member.role = member.role
        },
        removeMember() {
            this.member.memId = ''
            this.member.createDateTime = ''
            this.member.nickname = ''
            this.member.role = ''
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