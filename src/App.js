import Header from "./components/Header";
import {RouterProvider} from "react-router-dom";
import {router} from "./utils/Constants";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {fetchChannels} from "./store/actions/channelActions";
import {useDispatch} from "react-redux";
import {initGA, logPageView} from "./utils/analytics";
import Footer from "./components/Footer";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        initGA(); // Khởi tạo Google Analytics
        logPageView(); // Gửi pageview khi ứng dụng được tải
    }, []);
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
            <Footer id="footer"/>
        </>
    )
}

export default App
