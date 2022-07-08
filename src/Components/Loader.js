import React from "react";
import loaderStyle from "../../src/css/loaderStyle.module.css";
const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {" "}
      <div class={`${loaderStyle.ldsfacebook}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>{" "}
    </div>
  );
};
export default Loader;
