import Posts from "../../components/Posts/Card";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import BottomNavigation from "../../components/BootomNavigation/BottomNavigation";
import { Alert } from "antd";
import swal from "sweetalert";
import getLikedPost from "../../function/useGetLikedPost";
import { useSelector } from "react-redux";

const PostPageMain = () => {
  const [posts, setPosts] = useState<any>([]);
  const logdInUser = useSelector((state: any) => state?.user?.user?.user);

  useEffect(() => {
    let pop_status = localStorage.getItem("pop_status");
    if (!pop_status) {
      localStorage.setItem("pop_status", "1");
      swal(
        `Working on ui and profile page. 
       this is only for testing purpose.
       Have a nice day 😊`
      );
    }
  }, []);

  useEffect(() => {
    // const postRef = collection(db, "post");
    const postRef = query(collection(db, "post"), orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(postRef, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id })));
    });

    const likedPostsquery = query(collection(db, "UserConfigurations"));
    const likedPosts = onSnapshot(likedPostsquery, (snapshot) => {
      getLikedPost({ ...logdInUser });
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
    //     setCommentData({ id: doc.id, data: doc.data() });
    //   });
    // });

    return () => {
      unsub();
      likedPosts();
    };
  }, []);

  return (
    <>
      <div className="w-full bg-slate-600 p-0 sm:p-2  flex  min-h-screen pb-16">
        <div className="w-full sm:w-1/2 flex  m-auto ">
          <Posts postsData={posts} />
        </div>
      </div>
    </>
  );
};

export default PostPageMain;
