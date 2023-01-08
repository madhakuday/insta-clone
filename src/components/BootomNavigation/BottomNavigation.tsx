import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import "./BottomNavigation.scss";
import PostModal from "../PostUploadModal/Modal";
import { Link } from "react-router-dom";

const BottomNavigation = () => {
  const [activeNav, setActiveNav] = useState("#home");
  return (
    <div className="bottmNavigation">
      <nav>
        <Link
          to="/"
          onClick={() => setActiveNav("#home")}
          className={activeNav === "#home" ? "active" : ""}
          style={{ color: "white" }}
        >
          <AiOutlineHome />
        </Link>
        <a
          onClick={() => setActiveNav("#about")}
          className={activeNav === "#about" ? "active" : ""}
          style={{ color: "white" }}
        >
          <PostModal />
        </a>
        <Link
          to="/profile"
          onClick={() => setActiveNav("#experience")}
          className={activeNav === "#experience" ? "active" : ""}
          style={{ color: "white" }}
        >
          <BiBook />
        </Link>
      </nav>
    </div>
  );
};

export default BottomNavigation;
