import React from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import type { MenuProps } from "antd";

import { HomeFilled, UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PostModal from "../PostUploadModal/Modal";

import "./DeskTopNavigation.scss";
const items: MenuProps["items"] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: <PostModal content={"Upload"} />,
    key: "upload",
    icon: <UploadOutlined />,
  },
  {
    label: <Link to="profile">Profile</Link>,
    key: "profile",
    icon: <UserOutlined />,
  },
];
type Props = {
  collapsed: any;
  setCollapsed: any;
};

const DesktopNavigation: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="aside-bg-color"
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ position: "sticky", top: "0" }}
        />
      </Sider>
    </>
  );
};

export default DesktopNavigation;
