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

import MoreMenuDropDown from "../MoreMenuDropDown/MoreMenuDropDown";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import "./card.scss";

const { Meta } = Card;
const Cards: React.FC<any> = ({ data }: any) => {
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
  };

  useEffect(() => {
    console.log("D=>", data);
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
            <a href={data?.data?.imageUrl} target="_blank">
              <img
                alt="image..."
                className="w-full  md:w-full m-0 cursor-pointer"
                src={data?.data?.imageUrl}
                width="85%"
              />
            </a>
          </div>
        }
        actions={[
          <>
            <div className="flex justify-around">
              <span
                className="text-lg text-red-600 flex flex-col items-center  "
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
                  <HeartFilled className="like-btn" />
                ) : (
                  <HeartOutlined className="like-btn" />
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
        className="my-3 w-full sm:w-80 m-0	"
      >
        <p className="font-semibold  text-xs"> {data?.data?.description}</p>
      </Card>
    </>
  );
};

export default Cards;

