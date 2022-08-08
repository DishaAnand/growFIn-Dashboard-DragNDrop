import React, { useState } from "react";
import styles from "./notes.module.scss";
import { publicUtils } from "../../utility/utils";

function Notes({
  visibility,
  dropDownOption: { selectedOptions, setSelectedOptions }
}) {
  const [notes, setNotes] = useState([]);
  const [textAreaNote, setTextAreaNote] = useState("");

  const pushNotes = (e) => {
    if (textAreaNote === "") return;
    const newNote = notes.concat(textAreaNote);
    setNotes(newNote);
    setTextAreaNote("");
  };

  const handleDelete = (_, index) => {
    if (index > -1) {
      const newNote = notes.filter((_, idx) => idx !== index);
      setNotes(newNote);
    }
  };

  const handleNoteDisplay = () => {
    visibility(false);
    addNotesToDropDown();
  };

  const addNotesToDropDown = () => {
    publicUtils.addItemToDropdown(selectedOptions, setSelectedOptions, "Notes");
  };

  return (
    <div className={styles.notesContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.notesTitle}> Notes </div>
        <button
          className={styles.hideNote}
          title="delete widget"
          onClick={handleNoteDisplay}
        >
          X
        </button>
      </div>
      <div className={styles.addNotes}> Add Notes ...</div>
      <textarea
        className={styles.textArea}
        onChange={(e) => setTextAreaNote(e?.target?.value)}
        value={textAreaNote}
      />
      <div className={styles.addToNotes}>
        <button onClick={pushNotes}> + Add </button>
      </div>
      <div className={styles.notesListArea}>
        {(notes || []).map((note, index) => (
          <ul className={styles.noteItems}>
            <li> {note} </li>
            <button
              className={styles.trashBtn}
              onClick={(e) => handleDelete(e, index)}
            >
              <i style={{ fontSize: "15px" }} className="fa">
                {" "}
                &#xf014;{" "}
              </i>
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Notes;
