import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from "./components/Error/NotFound";
import Account from "./components/Account/Account";
import BlogDetail from "./components/Blog/Detail/BlogDetail";
import BlogAdd from "./components/Blog/Add/BlogAdd";
import GuestRoute from "./components/Utils/GuestRoute";
import AuthRoute from "./components/Utils/AuthRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/about",
        element: <About></About>,
    },
    {
        path: "/contact",
        element: <Contact></Contact>,
    },
    {
        path: "/login",
        element: <GuestRoute><Login></Login></GuestRoute>
    },
    {
        path: "/register",
        element: <GuestRoute><Register></Register></GuestRoute>
    },
    {
        path: "/my-account",
        element: <AuthRoute><Account></Account></AuthRoute>
    },
    {
        path: "/blog/add",
        element: <AuthRoute><BlogAdd></BlogAdd></AuthRoute>
    },
    {
        path: "/blog/:id",
        element: <BlogDetail></BlogDetail>
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }
]);

export default router;