import axios from 'axios'
import cookieUtil from "~/composables/cookie";
import {routers} from "~/composables/router";

const get = (url) => {
    try {
        axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
    } catch(error) {
        try {
            const accessToken = axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
            console.log(accessToken)
            cookieUtil.setWithMaxAge('accessToken', accessToken, 60 * 30)
        } catch(error) {
            routers.replace({ path: '/member/login'})
        }
    }
    try {
        const result = axios.get(url)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const post = (url, data) => {
    try {
        axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
    } catch(error) {
        try {
            const accessToken = axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
            console.log(accessToken)
            cookieUtil.setWithMaxAge('accessToken', accessToken, 60 * 30)
        } catch(error) {
            routers.replace({ path: '/member/login'})
        }
    }
    try {
        const result = axios.post(url, data)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const patch = (url, data) => {
    try {
        axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
    } catch(error) {
        try {
            const accessToken = axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
            console.log(accessToken)
            cookieUtil.setWithMaxAge('accessToken', accessToken, 60 * 30)
        } catch(error) {
            routers.replace({ path: '/member/login'})
        }
    }
    try {
        const result = axios.patch(url, data)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const put = (url, data) => {
    try {
        axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
    } catch(error) {
        try {
            const accessToken = axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
            console.log(accessToken)
            cookieUtil.setWithMaxAge('accessToken', accessToken, 60 * 30)
        } catch(error) {
            routers.replace({ path: '/member/login'})
        }
    }
    try {
        const result = axios.put(url, data)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const remove = (url, data) => {
    try {
        axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
    } catch(error) {
        try {
            const accessToken = axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
            console.log(accessToken)
            cookieUtil.setWithMaxAge('accessToken', accessToken, 60 * 30)
        } catch(error) {
            routers.replace({ path: '/member/login'})
        }
    }
    try {
        const result = axios.delete(url, data)
        return result
    } catch (error) {
        alert(error.message)
    }
}
export const api = {
    post,
    get,
    put,
    remove,
    patch
}