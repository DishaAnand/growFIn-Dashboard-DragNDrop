import React, { useState } from "react";
import styles from "./tasks.module.scss";
import { Data } from "./data";
import { publicUtils } from "../../utility/utils";
import moment from "moment";
import cx from "classnames";

function Tasks({
  visibility,
  dropDownOption: { selectedOptions, setSelectedOptions }
}) {
  const [tasks, setTasks] = useState(Data || []);
  const [nonFinishedTask, setNonFinishedTask] = useState(tasks?.length || 0);
  const handleTaskDisplay = () => {
    visibility(false);
    addTaskToDropDown();
  };
  const addTaskToDropDown = () => {
    publicUtils.addItemToDropdown(selectedOptions, setSelectedOptions, "Tasks");
  };
  const colorMap = {
    overdue: ["#FF4D4F"],
    upcoming: ["#FFA940"]
  };
  const getColor = (date) =>
    moment(date).isAfter(new Date().valueOf())
      ? { backgroundColor: colorMap["upcoming"] }
      : { backgroundColor: colorMap["overdue"] };
  const getText = (date, complete) => {
    if (complete) return "Completed";
    return moment(date).isAfter(new Date().valueOf()) ? "Upcoming" : "Overdue";
  };
  const handleOnCheck = (idx) => {
    const clickedTask = tasks[idx];
    if (!clickedTask.complete) clickedTask.complete = true;
    else clickedTask.complete = false;
    manipulateTaskArray(idx);
  };
  const manipulateTaskArray = () => {
    const copyTaskList = [...tasks];
    const completedTask = [];
    const nonCompletedTask = [];
    copyTaskList.forEach((task) => {
      if (task.complete) completedTask.push(task);
      else {
        nonCompletedTask.push(task);
        setNonFinishedTask(nonCompletedTask.length);
      }
    });
    const updatedTaskList = nonCompletedTask.concat(completedTask);
    setTasks(updatedTaskList);
  };

  return (
    <div className={styles.taskContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.taskHeader}>{`Tasks (${nonFinishedTask})`}</div>
        <button
          title="delete widget"
          className={styles.hideTask}
          onClick={handleTaskDisplay}
        >
          X
        </button>
      </div>
      <div className={styles.taskListContainer}>
        {tasks.map(({ title, date, complete }, index) => (
          <div className={styles.taskList}>
            <button
              className={styles.checkBtn}
              onClick={() => handleOnCheck(index)}
            >
              <i
                style={{
                  fontSize: "24px",
                  color: complete ? "#73D13D" : "#BFBFBF",
                  cursor: "pointer"
                }}
                className={cx("fa")}
                title={complete ? "mark unfinished" : "mark as complete"}
              >
                &#xf058;
              </i>
            </button>
            <div className={styles.paraContainer}>
              <p style={{ textDecoration: complete ? "line-through" : "" }}>
                {" "}
                {title}{" "}
              </p>
              <div className={styles.taskDate}>
                {moment(date).format("D MMM YYYY")}
              </div>
            </div>
            <div
              style={complete ? { backgroundColor: "#73D13D" } : getColor(date)}
              className={styles.status}
            >
              {complete ? getText(date, true) : getText(date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
