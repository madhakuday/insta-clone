import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import store from "../redux/store/store";
import { setUser } from "../redux/reducer/reducer";

const useGetLikedPost = () => {
  const user = useSelector((state: any) => state?.user?.user?.user);
  console.log("user", user);

  const q = query(
    collection(db, "UserConfigurations"),
    where("userAuthId", "==", user?.user?.sub)
  );

  getDocs(q)
    .then((querySnapshot) => {
      const documents: any = [];
      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      console.log("Documet : ", documents);
      store.dispatch(
        setUser({
          user: {
            likedPosts: documents[0]?.postId,
          },
        })
      );
    })
    .catch((error) => {
      console.log("Error getting documents:", error);
    });

  return true;
};

export default useGetLikedPost;
