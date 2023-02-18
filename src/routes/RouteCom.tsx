import { Routes, Route } from "react-router-dom";
import { PostPageMain, Profile } from "../pages/index";
import PrivateRoute from "./PrivateRoute";
import LayOut from "../pages/Layout";
import UserProfile from "../pages/UserProfile/UserProfile";

const RouteCom = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<LayOut />}>
            <Route path="/" element={<PostPageMain />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/:id" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default RouteCom;
