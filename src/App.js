import React, { useEffect, useContext } from "react";
import Header from "./components/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/Constants";
import { ToastContainer } from "react-toastify";
import { fetchChannels } from "./store/actions/channelActions";
import { useDispatch } from "react-redux";
import { initGA, logPageView } from "./utils/analytics";
import Footer from "./components/Footer";
import { ThemeContext } from "./components/ThemeContext"; // Import Context

function App() {
    const dispatch = useDispatch();
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        initGA(); // Khởi tạo Google Analytics
        logPageView(); // Gửi pageview khi ứng dụng được tải
    }, []);

    return (
        <div className={darkMode ? "dark-mode" : "light-mode"}>
            <Header />
            <div className="theme-toggle" style={{ textAlign: "right", padding: "10px" }}>
                <button
                    onClick={toggleTheme}
                    style={{
                        padding: "10px",
                        fontSize: "14px",
                        backgroundColor: darkMode ? "#333" : "#eee",
                        color: darkMode ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Switch to {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
            <RouterProvider router={router} />
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
            <Footer id="footer" />
        </div>
    );
}

export default App
