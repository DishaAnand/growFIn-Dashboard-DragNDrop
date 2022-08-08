import { useState } from "react";
//styles
import styles from "./styles.module.scss";
// external
import Select from "react-select";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
// internal components
import Notes from "./components/Notes/notes";
import Timer from "./components/TimerWidget/timer";
import Tasks from "./components/Tasks/tasks";
// files
import blank from "./images/blank.svg";
import { url } from "./images/logolink";

const options = [
  { value: "Timer", label: "Work Timer" },
  { value: "Notes", label: "Notes" },
  { value: "Tasks", label: "Tasks" }
];

function App(props) {
  const [selectValue, setSelectValue] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timerVisible, setTimerVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);

  const handleChange = (e) => {
    const newSelectedOptions = [...selectedOptions, e?.value];
    setSelectedOptions(newSelectedOptions);
    setSelectValue(e);
    setVisibility(e);
  };

  const setVisibility = (e) => {
    if (e?.value === "Timer") setTimerVisible(true);
    if (e?.value === "Tasks") setTasksVisible(true);
    if (e?.value === "Notes") setNotesVisible(true);
  };

  const notesPos = useSpring({ x: 0, y: 0 });
  const timerPos = useSpring({ x: 0, y: 0 });
  const tasksPos = useSpring({ x: 0, y: 0 });
  const bindTimerPos = useDrag((params) => {
    timerPos.x.set(params.offset[0]);
    timerPos.y.set(params.offset[1]);
  });
  const bindNotesPos = useDrag((params) => {
    notesPos.x.set(params.offset[0]);
    notesPos.y.set(params.offset[1]);
  });
  const bindTasksPos = useDrag((params) => {
    tasksPos.x.set(params.offset[0]);
    tasksPos.y.set(params.offset[1]);
  });
  return (
    <div className={styles.App} id={props.id}>
      <div className={styles.navbar}>
        <img src={url} height="50px" width="100px" alt="logo" />
        <div className={styles.dropdown}>
          <Select
            options={options.filter(
              (option) => !selectedOptions.includes(option.value)
            )}
            onChange={handleChange}
            value={selectValue}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null
            }}
            placeholder={
              <div className={styles.placeholderText}>+ Add Widget </div>
            }
          />
        </div>
      </div>
      {!timerVisible && !notesVisible && !tasksVisible && (
        <img className={styles.emptyPage} src={blank} alt="empty page" />
      )}
      {timerVisible && (
        <animated.div
          {...bindTimerPos()}
          style={{
            x: timerPos.x,
            y: timerPos.y
          }}
        >
          <Timer
            visibility={setTimerVisible}
            dropDownOption={{ selectedOptions, setSelectedOptions }}
          />
        </animated.div>
      )}
      {notesVisible && (
        <animated.div
          {...bindNotesPos()}
          style={{
            x: notesPos.x,
            y: notesPos.y
          }}
        >
          <Notes
            visibility={setNotesVisible}
            dropDownOption={{ selectedOptions, setSelectedOptions }}
          />
        </animated.div>
      )}
      {tasksVisible && (
        <animated.div
          {...bindTasksPos()}
          style={{
            x: tasksPos.x,
            y: tasksPos.y
          }}
        >
          <Tasks
            visibility={setTasksVisible}
            dropDownOption={{ selectedOptions, setSelectedOptions }}
          />
        </animated.div>
      )}
    </div>
  );
}

export default App;
