import React from "react";
import "./Loader.scss";
const Loader = () => {
  return (
    <>
      <div
        aria-busy="true"
        aria-label="Loading"
        role="progressbar"
        className="container"
      >
        <div className="swing">
          <div className="swing-l"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="swing-r"></div>
        </div>
        <div className="shadow">
          <div className="shadow-l"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="shadow-r"></div>
        </div>
      </div>
      {/* <div
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
      </div> */}
    </>
  );
};

export default Loader;
