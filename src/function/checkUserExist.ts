import { collection, getDocs, query, where } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import uuid from "react-uuid";

import { db } from "../firebase";
import store from "../redux/store/store";

const checkUserExist = async (user: any) => {
  // userDetails
  //  userAuthId
  const userSubId = user?.sub.slice(user?.sub.indexOf("|") + 1);

  if (user?.sub) {
    const q = query(
      collection(db, "userDetails"),
      where("userAuthId", "==", userSubId)
    );

    getDocs(q)
      .then(async (querySnapshot) => {
        const documents: any = [];
        querySnapshot.forEach((doc) => {
          documents.push(doc.data());
        });

        if (documents.length == 0) {
          const username = user?.nickname ? user.nickname : user.name;
          const userDetails = {
            username: username,
            userAuthId: userSubId,
            email: user?.email,
            userProfile: user?.picture,
          };
          let a = await setDoc(doc(db, "userDetails", uuid()), userDetails);
          //  Save user data in table
        } else {
          // Do nothing
          return;
        }
      })
      .catch((error) => console.log("Error", error));
  }
  return "Ok";
};

export default checkUserExist;
