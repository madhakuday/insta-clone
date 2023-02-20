import { collection, getDocs, query, where } from "firebase/firestore";
import { resolve } from "path";
import { db } from "../firebase";

const getUserId = async (sub: any) => {
  return new Promise((resolve, reject) => {
    const userSubId = sub.slice(sub.indexOf("|") + 1);

    const q = query(
      collection(db, "userDetails"),
      where("userAuthId", "==", userSubId)
    );

    let text = "";
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          resolve(doc.id);
        });
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  });
};
export default getUserId;
