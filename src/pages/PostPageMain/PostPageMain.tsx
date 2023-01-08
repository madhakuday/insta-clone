import Posts from "../../components/Posts/Posts";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import BottomNavigation from "../../components/BootomNavigation/BottomNavigation";
import { Alert } from "antd";
import swal from "sweetalert";

const PostPageMain = () => {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    let pop_status = localStorage.getItem("pop_status");
    if (!pop_status) {
      localStorage.setItem("pop_status", "1");
      swal(
        `Working on you ui and profile page. 
       this is only test for version.
       Have a nice day 😊`
      );
    }
  }, []);

  useEffect(() => {
    const postRef = collection(db, "post");
    const unsub = onSnapshot(postRef, (snapshot) => {
      let a = snapshot.docs.map((doc) => doc.data());
      console.log("Data", a);
      setPosts(snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id })));
    });

    /*Sub collection Query */
    // const messageRef = collection(
    //   db,
    //   "post",
    //   "FQgP9CAGXy3BG1jOxGc1",
    //   "comments"
    // );
    // onSnapshot(messageRef, (querySnapshot: any) => {
    //   querySnapshot.forEach((doc: any) => {
    //     console.log("Id: ", doc.id, "Data: ", doc.data());
    //     setCommentData({ id: doc.id, data: doc.data() });
    //   });
    // });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <BottomNavigation />
      <div className="w-full bg-slate-600 p-2  flex  min-h-screen ">
        <div className="w-1/2 flex  m-auto ">
          <Posts postsData={posts} />
        </div>
      </div>
    </>
  );
};

export default PostPageMain;
