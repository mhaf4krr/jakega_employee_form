import React from "react";

import styles from "./General.module.css";

export default function General(props) {
  return (
    <div className="container">
      <div className={styles["main_wrapper"]}>{props.children}</div>
    </div>
  );
}
