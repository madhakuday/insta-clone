import Typography from "antd/es/typography/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import "./UserProfile.scss";
import { useSelector } from "react-redux";
import { db } from "../../firebase";

const UserProfile = () => {
  const [userData, setUserData] = useState<any>({});
  const [postData, setPostData] = useState<any>([]);
  const { id }: any = useParams();
  const logdInUser = useSelector((state: any) => state?.user?.user?.user);

  useEffect(() => {
    (async () => {
      console.log("Id", id);
      const docRef = doc(db, "post", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        const q = query(
          collection(db, "post"),
          where("userAuthId", "==", docSnap?.data().userAuthId)
        );
        getDocs(q)
          .then(async (querySnapshot) => {
            const documents: any = [];
            querySnapshot.forEach((doc) => {
              documents.push(doc.data());
            });
            setPostData(documents);
          })
          .catch((error) => {
            console.log("Error getting documents:", error);
          });
      } else {
        console.log("Document does not exist");
      }
    })();
  }, []);

  return (
    <>
      <section className="min-h-screen bg-transparent flex flex-col w-full h-full">
        <div className="p-3 border-b-2 border-cyan-200">
          <div className="flex justify-evenly ">
            <img
              src={userData?.userProfile}
              alt="UserLog..."
              className="rounded-full"
            />
            <div>
              <Typography className="text-white p-2 font-family">
                {userData?.username}
              </Typography>
              <Typography className="text-white p-2 font-family">
                Some data Some data Some data
              </Typography>
            </div>
          </div>
          <div></div>
        </div>
        <div className="p-3 ">
          <section className="overflow-hidden text-gray-700 ">
            <div className="container   mx-auto pt-5 ">
              <div className="flex flex-wrap -m-1 md:-m-2 md:justify-start justify-center">
                {postData?.map(
                  (
                    {
                      imageUrl,
                      userAuthId,
                    }: {
                      userAuthId: string;
                      imageUrl: string;
                    },
                    i: number
                  ) => {
                    return (
                      <React.Fragment key={i}>
                        <div className="flex flex-wrap w-2/5 md:w-1/3 cursor-pointer ">
                          <div className="w-full p-1 md:p-2">
                            <img
                              alt="gallery"
                              className="block object-cover object-center w-full h-full rounded-lg"
                              src={imageUrl}
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  }
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
