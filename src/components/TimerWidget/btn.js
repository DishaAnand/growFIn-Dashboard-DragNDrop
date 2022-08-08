import React from "react";
import styles from "../../styles.module.scss";

function BtnComponent(props) {
  const { start, status, stop, reset, resume } = props;
  return (
    <div className={styles.btnContainer}>
      {status === 0 ? (
        <button className={styles.stopwatchBtnStart} onClick={start}>
          {" "}
          Start
        </button>
      ) : (
        ""
      )}

      {status === 1 ? (
        <div>
          <button className={styles.stopwatchBtnStop} onClick={stop}>
            Stop
          </button>
          &nbsp; &nbsp;
          <button className={styles.stopwatchBtnReset} onClick={reset}>
            Reset
          </button>
        </div>
      ) : (
        ""
      )}

      {status === 2 ? (
        <div>
          <button className={styles.stopwatchBtnResume} onClick={resume}>
            Resume
          </button>
          &nbsp; &nbsp;
          <button className={styles.stopwatchBtnReset} onClick={reset}>
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BtnComponent;
