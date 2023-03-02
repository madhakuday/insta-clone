import React from "react";
import Cards from "../../components/PostCards/Card";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
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
    const postRef = query(collection(db, "post"), orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(postRef, async (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));

      const userDetailsRef = collection(db, "userDetails");

      onSnapshot(userDetailsRef, async (users) => {
        const userData = users.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        const array: any = [];

        postData.forEach((x) => {
          const findSaeResult = userData.find(
            (s) => x?.data?.userAuthId == s?.data?.userAuthId
          );
          if (findSaeResult) {
            const object = {
              id: x.id,
              userDeatisId: findSaeResult?.id,
              data: {
                ...x?.data,
                ...findSaeResult?.data,
              },
            };
            array.push(object);
          } else {
            array.push(x);
          }
        });

        setPosts(array);
      });
      // setPosts(snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id })));
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
          <div className="w-full flex flex-col items-center">
            {posts.map((x: any) => {
              return (
                <React.Fragment key={x?.id}>
                  <Cards data={x} />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPageMain;
