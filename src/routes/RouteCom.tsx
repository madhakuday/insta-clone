import { Routes, Route } from "react-router-dom";
import { MainPage, Profile, UserProfile, LayOut } from "../pages/index";
import PrivateRoute from "./PrivateRoute";

const RouteCom = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<LayOut />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/:id" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default RouteCom;
