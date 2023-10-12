import axios from 'axios'
import cookieUtil from "~/composables/cookie";
import router from "~/composables/router";
import {store} from "~/composables/store";
import toastAlert from "~/composables/toast";

const getMe = async () => {
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
            // routers.replace({ path: '/member/login'})
        }
        try {
            const meResult = await axios.get(`/api/members/me`, {
                headers: {
                    Authentication: cookieUtil.get('accessToken')
                }
            })
            store().setMember(meResult.data.member)
        } catch(error) {

        }
    }
    store().setMember(meResult.data.member)
}
const get = async (url) => {
    getMe()
    try {
        const result = axios.get(url, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        return result
    } catch (error) {
        toastAlert.error(error.response.data)
    }
}
const post = async (url, data) => {
    getMe()
    try {
        const result = axios.post(url, data, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        return result
    } catch (error) {
        toastAlert.error(error.response.data)
    }
}
const patch = async (url, data) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        store().setMember(meResult.data.member)
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                router.replace({ path: '/member/login'})
            }
            try {
                const meResult = await axios.get(`/api/members/me`, {
                    headers: {
                        Authentication: cookieUtil.get('accessToken')
                    }
                })
                store().setMember(meResult.data.member)

            } catch(error) {

            }
        }
    } catch(error) {
    }
    try {
        const result = axios.patch(url, data, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        return result
    } catch (error) {
        toastAlert.error(error.response.data)
    }
}
const put = async (url, data) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        store().setMember(meResult.data.member)
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                router.replace({ path: '/member/login'})
            }
            try {
                const meResult = await axios.get(`/api/members/me`, {
                    headers: {
                        Authentication: cookieUtil.get('accessToken')
                    }
                })
                store().setMember(meResult.data.member)

            } catch(error) {

            }
        }
    } catch(error) {
    }
    try {
        const result = axios.put(url, data, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        return result
    } catch (error) {
        toastAlert.error(error.response.data)
    }
}
const remove = async (url) => {
    try {
        const meResult = await axios.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        store().setMember(meResult.data.member)
        if(meResult.data.member === '') {
            try {
                const { data } = await axios.get(`/api/members/regenAccessToken?refreshToken=${cookieUtil.get('refreshToken')}`)
                cookieUtil.setWithMaxAge('accessToken', data, 60 * 30)
            } catch(error) {
                router.replace({ path: '/member/login'})
            }
            try {
                 const meResult = await axios.get(`/api/members/me`, {
                    headers: {
                        Authentication: cookieUtil.get('accessToken')
                    }
                })
                store().setMember(meResult.data.member)

            } catch(error) {

            }
        }
    } catch(error) {
    }
    try {
        const result = axios.delete(url, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        return result
    } catch (error) {
        toastAlert.error(error.response.data)
    }
}
export const api = {
    post,
    get,
    put,
    remove,
    patch,
    getMe
}