import {defineStore} from 'pinia'

export const useStore = defineStore('member', {
    state: () => ({
        member: {
            memId: '',
            nickname: '',
            createDateTime: '',
            role: '',
            email: ''
        }
    }),
    mutations: {
        setMember(member) {
            // localStorage.setItem('member', JSON.stringify(member))
        },
    },
    actions: {
        setMember(member) {
            // localStorage.setItem('member', JSON.stringify(member))
            this.member.memId = member.memId
            this.member.createDateTime = member.createDateTime
            this.member.nickname = member.nickname
            this.member.role = member.role
            this.member.email = member.email
        },
        removeMember() {
            this.member.memId = ''
            this.member.createDateTime = ''
            this.member.nickname = ''
            this.member.role = ''
            this.member.email = ''
        },
        logout() {
            // Remove member from local storage
            // localStorage.removeItem('member')
            this.removeMember()
            api.get(`/api/members/me`)
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