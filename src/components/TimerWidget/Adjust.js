import React from "react";
import styles from "../../styles.module.scss";
function Adjust({ time }) {
  const { h, m, s, ms } = time;

  const hoursFunc = () => {
    if (h === 0) return "";
    else return <span> {h >= 10 ? h : "0" + h}</span>;
  };

  return (
    <div className={styles.timerData}>
      {hoursFunc()}
      <div className={styles.numericTimeText}>
        <span>{m >= 10 ? m : "0" + m}</span>:
        <span>{s >= 10 ? s : "0" + s}</span>:
        <span>{ms >= 10 ? ms : "0" + ms}</span>
      </div>
      <div className={styles.alphaTimeText}>
        <span className={styles.grayText}> HH</span>:
        <span className={styles.grayText}> MM </span>:
        <span className={styles.grayText}> SS </span>
      </div>
    </div>
  );
}

export default Adjust;
