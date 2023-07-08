import axios from 'axios'
import cookieUtil from "~/composables/cookie";
import {routers} from "~/composables/router";

const get = async (url) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                routers.replace({ path: '/member/login'})
            }
        }
    } catch(error) {
    }
    try {
        const result = axios.get(url)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const post = async (url, data) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                routers.replace({ path: '/member/login'})
            }
        }
    } catch(error) {
    }
    try {
        const result = axios.post(url, data)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const patch = async (url, data) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                routers.replace({ path: '/member/login'})
            }
        }
    } catch(error) {
    }
    try {
        const result = axios.patch(url, data)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const put = async (url, data) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                routers.replace({ path: '/member/login'})
            }
        }
    } catch(error) {
    }
    try {
        const result = axios.put(url, data)
        return result
    } catch (error) {
        alert(error.message)
    }
}
const remove = async (url, data) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                routers.replace({ path: '/member/login'})
            }
        }
    } catch(error) {
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