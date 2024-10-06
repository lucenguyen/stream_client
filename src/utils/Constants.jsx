import {createBrowserRouter} from "react-router-dom";
import StreamChannel from "../components/StreamChannel";
import Home from "../components/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },{
        path: "/:id",
        element: <StreamChannel></StreamChannel>
    },
]);
