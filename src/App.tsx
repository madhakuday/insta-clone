import { useEffect, useState, useCallback } from "react";
import RouteCom from "./routes/RouteCom";
import { useAuth0 } from "@auth0/auth0-react";

import store from "./redux/store/store";
import { setUser } from "./redux/reducer/reducer";

import { LandingPage } from "./pages/index";
import { Loader } from "./components/index";

import getLikedPost from "./function/useGetLikedPost";
import checkUserExist from "./function/checkUserExist";

const App = () => {
  const [showComp, setShowComp] = useState<boolean>(false);
  const { isLoading, user, isAuthenticated } = useAuth0();

  const getdata = useCallback(async () => {
    if (user) {
      store.dispatch(
        setUser({
          user: {
            ...user,
            isAuthenticated,
          },
        })
      );
      getLikedPost({ ...user, isAuthenticated });

      setShowComp(true);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    getdata();
    checkUserExist(user);
  }, [user, getdata]);

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {!isLoading && !isAuthenticated && (
        <>
          <LandingPage />
        </>
      )}
      {user && isAuthenticated && showComp && <RouteCom />}
    </>
  );
};

export default App;
