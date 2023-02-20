import React from "react";
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
} from "firebase/firestore";

import "./card.scss";
import MoreMenuDropDown from "../MoreMenuDropDown/MoreMenuDropDown";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { Link, useNavigate } from "react-router-dom";

const { Meta } = Card;
const Cards: React.FC<any> = ({ postsData }) => {
  const navigate = useNavigate();
  const logdInUser = useSelector((state: any) => state?.user?.user);
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
                      title={
                        <>
                          <div className="">
                            <Link to={`/${x?.id}`} className="flex gap-2">
                              <Avatar
                                className="cursor-pointer"
                                src={x?.data?.userProfile}
                              />
                              <p className="cursor-pointer font-semibold">
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
