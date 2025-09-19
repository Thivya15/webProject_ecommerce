import { Routes, Route } from "react-router-dom";
import ViewCart from "./components/ViewCart";
import UserProfile from "./components/UserProfile";
import ViewProducts from "./components/ViewProducts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewProducts />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/viewCart" element={<ViewCart />} />
    </Routes>
  );
};

export default AppRoutes;
