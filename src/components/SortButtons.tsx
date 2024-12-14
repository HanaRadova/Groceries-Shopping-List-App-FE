import React from "react";

interface SortButtonsProps {
  showActive: boolean;
  toggleShowActive: () => void;
  showArchived: boolean;
  toggleShowArchived: () => void;
  onAddNewList: () => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({
  showActive,
  toggleShowActive,
  showArchived,
  toggleShowArchived,
  onAddNewList,
}) => (
  <div className="listsSort">
    <button onClick={toggleShowActive}>{showActive ? "Hide Active" : "Active"}</button>
    <button onClick={toggleShowArchived}>{showArchived ? "Hide Archived" : "Archived"}</button>
    <button onClick={onAddNewList}>+</button>
  </div>
);

export default SortButtons;
