import toastAlert from "~/composables/toast";

const routes = {
    alertRouteQuery: () => {
        let message = useRoute().query.message
        if (message) {
            toastAlert.success(message)
        }
    }
}

export default routes