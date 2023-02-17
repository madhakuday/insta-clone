import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { MenuProps, message } from "antd";
import { Dropdown, Space } from "antd";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const MoreMenuDropDown: React.FC<any> = (data) => {
    async function deleteData() {
        console.log(data);

        try {
            await deleteDoc(doc(db, "post", data.data.id));
            let imageUrl = data.data.data.imageUrl;
            console.log(imageUrl);

            const storage = getStorage();
            const fileRef = ref(storage, imageUrl)

            deleteObject(fileRef)
                .then(() => {
                    console.log("File deleted successfully");
                })
                .catch((error) => {
                    console.log("Error deleting file:", error);
                });

            message.success('Done')
        } catch (error) {
            message.error(':)')

            console.log("Error  :", error);
        }
    }

    const items: MenuProps["items"] = [
        {
            label: <p style={{ margin: '0' }} onClick={() => deleteData()}>Delete</p>,
            key: "0",
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
