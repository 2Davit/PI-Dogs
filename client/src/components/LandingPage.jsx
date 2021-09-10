import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import Golden from "../res/Golden.mp4";

const LandingPage = () => {
  return (
    <div className={s.container}>
      <video autoPlay loop muted className={s.bgVideo}>
        <source src={Golden} type="video/mp4" />
      </video>
      <Link to="/home">
        <button className={s.enterBtn}>ENTER</button>
      </Link>
    </div>
  );
};

export default LandingPage;
