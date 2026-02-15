
import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import ProductList from "../pages/ProductList/ProductList";

function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="*" element={<Error />}/>
        </Routes>
    )
}

export default AppRoutes;