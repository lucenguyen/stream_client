import Header from "./components/Header";
import {RouterProvider} from "react-router-dom";
import {router} from "./utils/Constants";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {fetchChannels} from "./store/actions/channelActions";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);
    return (
        <>
            <Header/>
            <RouterProvider router={router}/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default App
