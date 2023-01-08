import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  // HeartOutlined,
  // CommentOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
// import { db } from "../../firebase";
// import { getDocs, collection, onSnapshot, doc } from "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";
const Posts = ({ postsData }: any) => {
  const [data, setData] = useState<any>([]);
  // const [commentData, setCommentData] = useState<any>({});

  // useEffect(() => {
  //   const postRef = collection(.db, "post");
  //   const unsub = onSnapshot(postRef, (snapshot) => {
  //     setData(snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id })));
  //   });

  //   const messageRef = collection(
  //     db,
  //     "post",
  //     "FQgP9CAGXy3BG1jOxGc1",
  //     "comments"
  //   );
  //   onSnapshot(messageRef, (querySnapshot: any) => {
  //     querySnapshot.forEach((doc: any) => {
  //       console.log("Id: ", doc.id, "Data: ", doc.data());
  //       setCommentData({ id: doc.id, data: doc.data() });
  //     });
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  useEffect(() => {
    console.log("PostData ", postsData);
    setData(postsData);
  }, [postsData]);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {data?.map((x: any) => {
          const { data } = x;
          return (
            <React.Fragment key={x.id}>
              <div className="p-2 rounded bg-slate-300 my-4 w-11/12 md:w-1/2  ">
                <div className="card-header p-3  flex gap-4 bg-slate-200 rounded my-1 ">
                  <Avatar size={30} icon={<UserOutlined />} />
                  <p className="text text-sm mb-0 flex items-center">
                    {data?.username}
                  </p>
                </div>
                <div className="card-body w-full">
                  <img
                    src={data?.imageUrl}
                    alt="Img..."
                    className="w-11/12 flex  m-auto rounded"
                    style={{ height: "300px" }}
                  />
                </div>
                <div className="card-footer bg-slate-200 p-2 rounded my-4">
                  {/* <span className="p-2 text-lg text-red-700 cursor-pointer">
                    <HeartOutlined />
                  </span>
                  <span className="p-2 text-lg  cursor-pointer">
                    <CommentOutlined />
                  </span> */}

                  <p className="mx-3 p-1 my-1 font-serif bg-slate-300 rounded ">
                    {data?.description}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
