import {createBrowserRouter} from "react-router-dom";
import StreamChannel from "../components/StreamChannel";
import Home from "../components/Home";

export const router = createBrowserRouter([
    {
        path: "stream_client/",
        element: <Home></Home>
    },{
        path: "stream_client/:id",
        element: <StreamChannel></StreamChannel>
    },
]);