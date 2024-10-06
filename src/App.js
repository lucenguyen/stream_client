import Header from "./components/Header";
import {RouterProvider} from "react-router-dom";
import {router} from "./utils/Constants";

function App() {
    return (
        <>
            <Header/>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
