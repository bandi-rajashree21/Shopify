
import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";

function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />}/>
        </Routes>
    )
}

export default AppRoutes;