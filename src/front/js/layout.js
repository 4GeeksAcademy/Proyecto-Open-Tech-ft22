import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Register } from "./pages/register";
import { FormManual } from "./pages/formManual";
import { Dashboard } from "./pages/dashboard";
import AdminInit from "./pages/adminInit";
import { ToastContainer } from "react-toastify";
import { SpectPages } from "./pages/spectPages";
import { ProtectedRoute } from "./pages/privateRoute";

//create your first component
const Layout = () => {
    const { store, actions } = React.useContext(Context);
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Register />} path="/register" />

                        <Route path='/dashboard' element={<ProtectedRoute currentUser={store.user} redirectPath={'/'} />}>
                            <Route index element={<Dashboard />} />
                            <Route path="formManual" element={<FormManual />} />
                            <Route path="spectPages/:roleName" element={<SpectPages />} />
                        </Route>

                        <Route element={<AdminInit />} path="/adminInit" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                    <ToastContainer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
