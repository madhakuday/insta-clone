import { Routes, Route } from "react-router-dom";
import { PostPageMain, Profile } from "../pages/index";
import { BottomNavigation } from "../components/index";
import PrivateRoute from "./PrivateRoute";
import DesktopNavigation from "../components/DeskTopNavigation/DesktopNavigation";
import LayOut from "../pages/Layout";

const RouteCom = () => {
  return (
    <>
      {/* <DesktopNavigation />
      <BottomNavigation /> */}
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<LayOut />}>
            <Route path="/" element={<PostPageMain />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default RouteCom;
