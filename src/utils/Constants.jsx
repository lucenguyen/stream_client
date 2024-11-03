import {createBrowserRouter, Navigate} from "react-router-dom";
import StreamChannel from "../components/StreamChannel";
import Home from "../components/Home";
import AddStream from "../components/AddStream";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "stream/:id",
        element: <StreamChannel></StreamChannel>
    },
    {
        path: "addStream",
        element: <AddStream></AddStream>
    },
    {
        path: "*",
        element: <Navigate to="/"/>,
    },
]);
