import React, { useState } from "react";
import BtnComponent from "./btn";
import Adjust from "./Adjust";
import { publicUtils } from "../../utility/utils";
import styles from "../../styles.module.scss";

function Timer({
  visibility,
  dropDownOption: { selectedOptions, setSelectedOptions }
}) {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };
  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;
  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };
  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };
  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };
  const resume = () => start();
  const handleTimer = () => {
    visibility(false);
    addTimerToDropdown();
  };
  const addTimerToDropdown = () => {
    publicUtils.addItemToDropdown(selectedOptions, setSelectedOptions, "Timer");
  };

  return (
    <div className={styles.mainSection}>
      <div className={styles.clockHolder}>
        <div className={styles.timerText}> WORK TIMER </div>
        <button
          title="delete widget"
          className={styles.removeTimer}
          onClick={handleTimer}
        >
          X
        </button>
        <div className={styles.stopWatch}>
          <div className={styles.timerContainer}>
            <Adjust time={time} />
            <BtnComponent
              status={status}
              resume={resume}
              reset={reset}
              stop={stop}
              start={start}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
