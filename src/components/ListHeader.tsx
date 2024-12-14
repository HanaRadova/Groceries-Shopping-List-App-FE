import React from "react";
import cogwheel from "../assets/images/cogwheel.png";
import share from "../assets/images/share.png";

interface ListHeaderProps {
  listName: string;
  onEditName: (name: string) => void;
  onOpenSettings: () => void;
  onGenerateShareLink: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  listName,
  onEditName,
  onOpenSettings,
  onGenerateShareLink,
}) => (
  <div className="listHeader">
    <input
      type="text"
      value={listName}
      onChange={(e) => onEditName(e.target.value)}
      className="listName"
    />
    <div className="listActions">
      <img
        src={cogwheel}
        alt="Settings"
        className="icon"
        onClick={onOpenSettings}
      />
      <img
        src={share}
        alt="Share"
        className="icon"
        onClick={onGenerateShareLink}
      />
    </div>
  </div>
);

export default ListHeader;
