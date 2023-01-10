import React, { useState } from "react";

import { HomeFilled, UserOutlined, UploadOutlined } from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { BottomNavigation } from "../components";
import PostModal from "../components/PostUploadModal/Modal";
import Card from "../components/Posts/Card";

const { Content, Footer, Sider } = Layout;

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

const LayOut: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentWidth, setContentWidth] = useState("13.1%");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {window.innerWidth > 950 && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            setTimeout(() => {
              if (collapsed) {
                setContentWidth("13.1%");
              } else {
                setContentWidth("5.2%");
              }
            }, 100);
            setCollapsed(value);
          }}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{ position: "sticky", top: "0" }}
          />
        </Sider>
      )}

      <Layout className="site-layout">
        <Content
          style={{
            overflow: "initial",
            height: 0,
            paddingLeft: window.innerWidth > 950 ? contentWidth : "0",
          }}
        >
          <div className="md:mb-2">
            <Outlet />
          </div>
        </Content>
        {window.innerWidth < 950 ? (
          <Footer
            style={{
              overflow: "auto",
              position: "fixed",
              bottom: 0,
              textAlign: "center",
              width: "100%",
              background: "transparent",
              padding: "0",
            }}
          >
            <BottomNavigation />
          </Footer>
        ) : (
          ""
        )}
      </Layout>
    </Layout>
  );
};

export default LayOut;
