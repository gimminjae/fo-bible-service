import {toast} from "vue3-toastify";

const toastAlert = {
    option: {
        autoClose: 10000,
        pauseOnHover: true,
        // position: ''
    },
    success: (msg) => {
        toast.success(msg, {
            autoClose: 2000,
            pauseOnHover: true,
            // position: ''
        });
    },
    info: (msg) => {
        toast.info(msg, {
            autoClose: 2000,
            pauseOnHover: true,
            // position: ''
        });
    },
    warn: (msg) => {
        toast.warn(msg, {
            autoClose: 2000,
            pauseOnHover: true,
            // position: ''
        });
    },
    error: (msg) => {
        toast.warn(msg, {
            autoClose: 2000,
            pauseOnHover: true,
            // position: ''
        });
    }
}
//     closeButton: SomeVNode, // CloseBtnType
//     type: toast.TYPE.INFO,
//     hideProgressBar: false,
//     position: toast.POSITION.TOP_LEFT,
//     pauseOnHover: true,
//     transition: MyCustomTransition,
//     progress: 0.2
// toast.info("World", options as ToastOptions);
// toast.warn(MyComponent, options as ToastOptions);
// toast.error("Error", options as ToastOptions);

export default toastAlert