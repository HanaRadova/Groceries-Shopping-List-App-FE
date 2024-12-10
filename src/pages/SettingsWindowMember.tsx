import React from 'react';
import '../styles.css'; 
interface Member {
  photo: string;
  name: string;
  id: string;
}

interface SettingsWindowProps {
  members: Member[];
  onLeave: (id: string) => void;
  hideArchived: boolean;
  setHideArchived: (value: boolean) => void;
  onClose: () => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  members,
  hideArchived,
  onLeave,
  setHideArchived,
  onClose,
}) => {
  return (
    <div className="settingsContainer">
      <button className="closeButton" onClick={onClose}>x</button>
      <h2>ALL MEMBERS</h2>
      <ul className="membersList">
        {members.map((member) => (
          <li key={member.id} className="memberRow">
            <img src={member.photo} alt={member.name} className="photo" />
            <span className="memberName">{member.name}</span>
            <button onClick={() => onLeave(member.id)} className="deleteButton">Leave</button>
          </li>
        ))}
      </ul>
      <h2>LIST SETTINGS</h2>
      <div className="setting">
        <span>Hide finished tasks</span>
        <button onClick={() => setHideArchived(!hideArchived)}>
          {hideArchived ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
};

export default SettingsWindow;