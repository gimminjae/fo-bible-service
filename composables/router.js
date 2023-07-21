const router = {
    replace: (data) => {
        useRouter().replace(data)
    },
    push: (data) => {
        useRouter().push(data)
    }
}

export default router