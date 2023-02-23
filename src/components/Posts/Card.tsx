import React, { useEffect, useState } from "react";
import {
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

import "./card.scss";
import MoreMenuDropDown from "../MoreMenuDropDown/MoreMenuDropDown";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { Link, useNavigate } from "react-router-dom";

const { Meta } = Card;
const Cards: React.FC<any> = ({ data }: any) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState<any>();
  const logdInUser = useSelector((state: any) => state?.user?.user);

  function countValues(arr: any, givenValue: any) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === givenValue) {
        count++;
      }
    }
    return count;
  }
  const getPostLikes = async () => {
    setLikes("");
    // const q = query(
    //   collection(db, "UserConfigurations"),
    //   where("postId", "array-contains", data?.id)
    // );
    const q = query(
      collection(db, "UserConfigurations"),
      where("postId", "array-contains", data?.id)
    );

    onSnapshot(q, async (queryData) => {
      if (!queryData.empty) {
        const userData = queryData.docs.map((doc) => {
          let object = {
            data: { ...doc.data() },
            id: doc.id,
          };
          return object;
        });
        if (userData?.length > 0) {
          console.log(userData);

          let num = 0;
          userData.forEach((element: any) => {
            const count = countValues(element?.data?.postId, data?.id);
            num += count;
          });
          setLikes(num);
        }
      } else {
        setLikes(0);
      }
    });
    // .then(async (querySnapshot) => {
    //   const documents: any = [];
    //   querySnapshot.forEach((doc) => {
    //     documents.push(doc.data());
    //   });
    //   if (documents.length > 0) {
    //     // console.log("Data", documents);
    //     let num = 0;
    //     documents.forEach((element: any) => {
    //       console.log(element.postId);
    //       const count = countValues(element.postId, data?.id);
    //       console.log(count);

    //       num += count;
    //     });
    //     setLikes(num);
    //   }
    // })
    // .catch((error) => {
    //   console.log("Error getting documents:", error);
    // });
  };
  useEffect(() => {
    getPostLikes();
  }, []);
  return (
    <>
      <Card
        title={
          <>
            <Meta
              title={
                <>
                  <div className="">
                    <Link
                      to={`/${data?.id}`}
                      className="flex gap-2 items-center "
                    >
                      <Avatar
                        className="cursor-pointer"
                        src={data?.data?.userProfile}
                      />
                      <p className="cursor-pointer font-semibold m-0">
                        {data?.data?.username}
                      </p>
                    </Link>
                  </div>
                </>
              }
            />
          </>
        }
        extra={<MoreMenuDropDown data={data} />}
        cover={
          <div className="flex items-center justify-center ">
            <img
              alt="image..."
              className="w-10/12 sm:w-full m-auto cursor-pointer"
              src={data?.data?.imageUrl}
              width="85%"
              onClick={() => {
                window.location.href = data?.data?.imageUrl;
              }}
            />
          </div>
        }
        actions={[
          <>
            <div className="flex justify-around">
              <span
                className="text-lg text-red-600 flex flex-col items-center "
                onClick={async () => {
                  const userSubId = logdInUser?.user?.sub.slice(
                    logdInUser?.user?.sub.indexOf("|") + 1
                  );
                  const q = query(
                    collection(db, "UserConfigurations"),
                    where("userAuthId", "==", userSubId)
                  );

                  getDocs(q)
                    .then(async (querySnapshot) => {
                      if (querySnapshot.empty == true) {
                        const UserConfigurationsData = {
                          userAuthId: userSubId,
                          postId: [data?.id],
                        };
                        let a = await setDoc(
                          doc(db, "UserConfigurations", uuid()),
                          UserConfigurationsData
                        );
                      }

                      const documents: any = [];
                      querySnapshot.forEach((doc) => {
                        const { postId, userAuthId } = doc?.data();
                        documents.push({
                          postId,
                          userAuthId,
                          id: doc.id,
                        });
                      });

                      const { postId, id } = documents[0];
                      const docRef = doc(db, "UserConfigurations", id);
                      if (postId?.includes(data?.id)) {
                        await updateDoc(docRef, {
                          postId: arrayRemove(data?.id),
                        });
                      } else {
                        await updateDoc(docRef, {
                          postId: arrayUnion(data?.id),
                        });
                      }
                    })
                    .catch((error) => {
                      console.log("Error getting documents:", error);
                    });

                  // const docRef = doc(db, "post", data?.id);

                  // const idIdExist = data?.data.array.find(
                  //   (s: any) => s == data?.id
                  // );

                  // if (idIdExist) {
                  //   await updateDoc(docRef, {
                  //     array: arrayRemove(data?.id),
                  //   });
                  // } else {
                  //   await updateDoc(docRef, {
                  //     array: arrayUnion(data?.id),
                  //   });
                  // }
                }}
              >
                {logdInUser?.likedPosts?.includes(data?.id) ? (
                  <HeartFilled />
                ) : (
                  <HeartOutlined />
                )}
                <span style={{ fontSize: ".9rem" }}>{likes}</span>
              </span>
              <span className="text-lg text-red-600">
                <CommentOutlined />
              </span>
              <span className="text-lg text-red-600">
                <EditOutlined />
              </span>
            </div>
          </>,
        ]}
        className="my-3 w-full sm:w-80	"
      >
        <p className="font-semibold  text-xs"> {data?.data?.description}</p>
      </Card>
    </>
  );
};

export default Cards;
/*
{
 {postsData?.map( 
        (x: {
          id: string;
          data: {
            username: string;
            imageUrl: string;
            description: string;
            userProfile: string;
            array: any;
          };
        }) => {
          const { data } = x;
          return (
            <React.Fragment key={data?.id}>
              <Card
                title={
                  <>
                    <Meta
                      title={
                        <>
                          <div className="">
                            <Link
                              to={`/${data?.id}`}
                              className="flex gap-2 items-center "
                            >
                              <Avatar
                                className="cursor-pointer"
                                src={data?.data?.userProfile}
                              />
                              <p className="cursor-pointer font-semibold m-0">
                                {data?.username}
                              </p>
                            </Link>
                          </div>
                        </>
                      }
                    />
                  </>
                }
                extra={<MoreMenuDropDown data={x} />}
                cover={
                  <div className="flex items-center justify-center ">
                    <img
                      alt="image..."
                      className="w-10/12 sm:w-full m-auto cursor-pointer"
                      src={data?.imageUrl}
                      width="85%"
                      onClick={() => {
                        window.location.href = data.imageUrl;
                      }}
                    />
                  </div>
                }
                actions={[
                  <>
                    <div className="flex justify-around">
                      <span
                        className="text-lg text-red-600 flex flex-col items-center "
                        onClick={async () => {
                          const userSubId = logdInUser?.user?.sub.slice(
                            logdInUser?.user?.sub.indexOf("|") + 1
                          );
                          const q = query(
                            collection(db, "UserConfigurations"),
                            where("userAuthId", "==", userSubId)
                          );

                          getDocs(q)
                            .then(async (querySnapshot) => {
                              if (querySnapshot.empty == true) {
                                const UserConfigurationsData = {
                                  userAuthId: userSubId,
                                  postId: [x.id],
                                };
                                let a = await setDoc(
                                  doc(db, "UserConfigurations", uuid()),
                                  UserConfigurationsData
                                );
                              }

                              const documents: any = [];
                              querySnapshot.forEach((doc) => {
                                const { postId, userAuthId } = doc?.data();
                                documents.push({
                                  postId,
                                  userAuthId,
                                  id: doc.id,
                                });
                              });

                              const { postId, id } = documents[0];
                              const docRef = doc(db, "UserConfigurations", id);
                              if (postId?.includes(x.id)) {
                                await updateDoc(docRef, {
                                  postId: arrayRemove(x.id),
                                });
                              } else {
                                await updateDoc(docRef, {
                                  postId: arrayUnion(x.id),
                                });
                              }
                            })
                            .catch((error) => {
                              console.log("Error getting documents:", error);
                            });

                          // const docRef = doc(db, "post", x.id);

                          // const idIdExist = x.data.array.find(
                          //   (s: any) => s == x.id
                          // );

                          // if (idIdExist) {
                          //   await updateDoc(docRef, {
                          //     array: arrayRemove(x.id),
                          //   });
                          // } else {
                          //   await updateDoc(docRef, {
                          //     array: arrayUnion(x.id),
                          //   });
                          // }
                        }}
                      >
                        {logdInUser?.likedPosts?.includes(x.id) ? (
                          <HeartFilled />
                        ) : (
                          <HeartOutlined />
                        )}
                        <span style={{ fontSize: ".9rem" }}>1</span>
                      </span>
                      <span className="text-lg text-red-600">
                        <CommentOutlined />
                      </span>
                      <span className="text-lg text-red-600">
                        <EditOutlined />
                      </span>
                    </div>
                  </>,
                ]}
                className="my-3 w-full sm:w-80	"
              >
                <p className="font-semibold  text-xs"> {data?.description}</p>
              </Card>
            </React.Fragment>
          );
        }
      )}   
}
  */
