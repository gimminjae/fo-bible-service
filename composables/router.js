
const router = useRouter()

const replace = (data) => {
    router.replace(data)
}
const push = (data) => {
    router.push(data)
}

export const routers = {
    replace,
    push
}