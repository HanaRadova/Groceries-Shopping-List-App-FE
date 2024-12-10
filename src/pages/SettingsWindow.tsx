import React from 'react';
import '../styles.css'; 
import { User } from '../types/types';
import UserPng from '../assets/images/user.png'


interface SettingsWindowProps {
  members: User[];
  onDeleteMember: (id: string) => void;
  hideArchived: boolean;
  setHideArchived: (value: boolean) => void;
  onClose: () => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  members,
  onDeleteMember,
  hideArchived,
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
            <img src={member.photo || UserPng} alt={member.name} className="photo" />
            <span className="memberName">{member.name}</span>
            <button onClick={() => onDeleteMember(member.id) } className="deleteButton">Remove Member</button>
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