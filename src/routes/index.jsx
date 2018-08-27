import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import SignIn from "signuppages/signIn";
import Home from "signuppages/home";
import SignInDone from "signuppages/signInDone";

const indexRoutes = [
        { path: "/", component: Home, exact: true}, 
        { path: "/signin", component: SignIn },
        { path: "/d", component: Dashboard},
        { path: "/f/signindone", component:SignInDone}
    ];

export default indexRoutes;
