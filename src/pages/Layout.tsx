import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { BottomNavigation } from "../components";
import DesktopNavigation from "../components/DeskTopNavigation/DesktopNavigation";

const { Content, Footer } = Layout;

const LayOut: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentWidth, setContentWidth] = useState("11.1%");
  const [screenWidth, setScreenWidth] = useState<number>(0);

  function setWidth() {
    setScreenWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth();
  }, []);

  window.addEventListener('resize', setWidth)
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {screenWidth > 950 && (
        <DesktopNavigation
          collapsed={collapsed}
          setContentWidth={setContentWidth}
          setCollapsed={setCollapsed}
        />
      )}

      <Layout className="site-layout" style={{ background: "#8a94a7" }}>
        <Content
          style={{
            overflow: "initial",
            height: 0,
            paddingLeft: screenWidth > 950 ? contentWidth : "0",
          }}
        >
          <div className="md:mb-2">
            <Outlet />
          </div>
        </Content>
        {screenWidth < 950 ? (
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
