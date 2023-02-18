import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { BottomNavigation } from "../components";
import DesktopNavigation from "../components/DeskTopNavigation/DesktopNavigation";
import "./LayOut.scss";
const { Content, Footer } = Layout;

const LayOut: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  function setWidth() {
    setScreenWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth();
  }, []);

  window.addEventListener("resize", setWidth);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {screenWidth > 950 && (
        <DesktopNavigation collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      <Layout className="site-layout" style={{ background: "#475569" }}>
        <Content>
          <div className="  content-main-div">
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
