import React from "react";
import "./Loader.scss";
const Loader = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#212531",
        }}
      >
        <span className="loader"></span>
      </div>
    </>
  );
};

export default Loader;
