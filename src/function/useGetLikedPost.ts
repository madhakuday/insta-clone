import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import store from "../redux/store/store";
import { updatePostId } from "../redux/reducer/reducer";

const getLikedPost = ({ sub }: any) => {

  const userSubId = sub.slice(sub.indexOf("|") + 1);

  const q = query(
    collection(db, "UserConfigurations"),
    where("userAuthId", "==", userSubId)
  );

  getDocs(q)
    .then((querySnapshot) => {
      const documents: any = [];
      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      store.dispatch(updatePostId(documents[0]?.postId));
    })
    .catch((error) => {
      console.log("Error getting documents:", error);
    });

  return true;
};

export default getLikedPost;
