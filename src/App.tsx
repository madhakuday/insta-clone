import { useEffect, useState, useCallback } from "react";
import RouteCom from "./routes/RouteCom";
import { useAuth0 } from "@auth0/auth0-react";
import store from "./redux/store/store";
import { setUser } from "./redux/reducer/reducer";
import { LandingPage } from "./pages/index";
import { Loader } from "./components/index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import getLikedPost from "./function/useGetLikedPost";

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

      // const q = query(
      //   collection(db, "UserConfigurations"),
      //   where("userAuthId", "==", user?.sub)
      // );

      // getDocs(q)
      //   .then((querySnapshot) => {
      //     const documents: any = [];
      //     querySnapshot.forEach((doc) => {
      //       documents.push(doc.data());
      //     });
      //     console.log("Documet : ", documents);
      //     store.dispatch(
      //       setUser({
      //         user: {
      //           user: {
      //             ...user,
      //             isAuthenticated,
      //           },
      //           likedPosts: documents[0]?.postId,
      //         },
      //       })
      //     );
      //   })
      //   .catch((error) => {
      //     store.dispatch(
      //       setUser({
      //         user: {
      //           ...user,
      //           isAuthenticated,
      //         },
      //       })
      //     );
      //     console.log("Error getting documents:", error);
      //   });

      //

      setShowComp(true);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    getdata();
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
