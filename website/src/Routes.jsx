import { Route, Routes } from "react-router-dom";
import UnderMaintenance from "./pages/UnderMaintenance";
import Register from "./pages/public/Register";
import Home from "./pages/public/Home";
import WebsiteIndex from "./layouts/Index";
import Login from "./pages/public/Login";
import ForgetPassword from "./pages/public/ForgetPassword";
import CompleteProfile from "./pages/private/CompleteProfile";
import PrivateRoute from "./utils/PrivateRoute";


export default function Router() {
  return (
    <Routes>
        <Route path="/" element={<WebsiteIndex />}>
            <Route index element={<Home />} />
        </Route>

        <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
            <Route path="complete-profile" element={<CompleteProfile />} />
            <Route path="change-password" element={<UnderMaintenance />} />
        </Route>
    </Routes>
  );
}
