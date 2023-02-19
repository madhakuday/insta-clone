import React, { useEffect } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Space, MenuProps, message, Typography } from "antd";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MoreMenuDropDown: React.FC<any> = (data) => {
  const location: any = useLocation();
  const { hostname, pathname } = location;
  const { user } = useSelector(
    (state: { user: { user: any } }) => state?.user?.user
  );
  async function deletPost() {
    try {
      await deleteDoc(doc(db, "post", data.data.id));
      let imageUrl = data.data.data.imageUrl;

      const storage = getStorage();
      const fileRef = ref(storage, imageUrl);

      deleteObject(fileRef)
        .then(() => {})
        .catch((error) => {});

      message.success("Done");
    } catch (error) {
      message.error(":)");
    }
  }

  const items: MenuProps["items"] = [
    user.sub == data?.data?.data?.userAuthId
      ? {
          label: (
            <>
              <p style={{ margin: "0" }} onClick={() => deletPost()}>
                Delete
              </p>
            </>
          ),
          key: "0",
        }
      : { label: "0", key: 2, style: { display: "none" } },
    {
      key: 3,
      label: (
        <Typography
          onClick={() => {
            const domain = window.location.host;
            navigator.clipboard
              .writeText(`${domain}/${data.data.id}`)
              .then(() => {
                message.success("Copied!");
              });
          }}
        >
          Copy Link
        </Typography>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MoreOutlined style={{ fontSize: "1.2rem" }} />
        </Space>
      </a>
    </Dropdown>
  );
};
export default MoreMenuDropDown;
