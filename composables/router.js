import {api} from "~/composables/api";

const router = useRouter()

const replace = (data) => {
    router.replace(data)
    api.getMe()
}
const push = (data) => {
    router.push(data)
    api.getMe()
}

export const routers = {
    replace,
    push
}