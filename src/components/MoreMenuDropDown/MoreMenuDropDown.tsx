import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const MoreMenuDropDown: React.FC<any> = ({ id }) => {
    async function deleteData(id: string) {
        try {
            console.log('Id', id)
            let data = await deleteDoc(doc(db, "post", id));
            console.log("Data", data);
        } catch (error) {
            console.log("Error  :", error);
        }
    }

    const items: MenuProps["items"] = [
        {
            label: <p onClick={() => deleteData(id)}>Delete</p>,
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
