import { Routes, Route } from "react-router-dom";
import { PostPageMain, Profile } from "../pages/index";
import { BottomNavigation } from "../components/index";
import PrivateRoute from "./PrivateRoute";

const RouteCom = () => {
  return (
    <>
      <BottomNavigation />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<PostPageMain />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouteCom;
