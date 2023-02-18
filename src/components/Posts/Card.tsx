import React, { useEffect } from "react";
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
} from "firebase/firestore"; // Import necessary methods from Firebase

import "./card.scss";
import MoreMenuDropDown from "../MoreMenuDropDown/MoreMenuDropDown";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

const { Meta } = Card;
const Cards: React.FC<any> = ({ postsData }) => {
  const logdInUser = useSelector((state: any) => state?.user?.user);
  useEffect(() => {
    console.log("logdInUser", logdInUser);
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
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
            <React.Fragment key={x?.id}>
              <Card
                title={
                  <>
                    <Meta
                      avatar={<Avatar src={x.data.userProfile} />}
                      title={data?.username}
                    />
                  </>
                }
                extra={<MoreMenuDropDown data={x} />}
                cover={
                  <div className="flex items-center justify-center ">
                    <img
                      alt="image..."
                      className="w-10/12 sm:w-full m-auto"
                      src={data?.imageUrl}
                      width="85%"
                    />
                  </div>
                }
                actions={[
                  <>
                    <div className="flex justify-around">
                      <span
                        className="text-lg text-red-600"
                        onClick={async () => {
                          console.log("l", logdInUser);

                          const q = query(
                            collection(db, "UserConfigurations"),
                            where("userAuthId", "==", logdInUser?.user?.sub)
                          );

                          getDocs(q)
                            .then(async (querySnapshot) => {
                              if (querySnapshot.empty == true) {
                                const UserConfigurationsData = {
                                  userAuthId: logdInUser?.user?.sub,
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

                              const { postId, userAuthId, id } = documents[0];
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
    </div>
  );
};

export default Cards;
