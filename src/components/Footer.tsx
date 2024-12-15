import React from "react";
import userImage from "../assets/images/user.png";

interface FooterProps {
  owner: string;
  isArchived: boolean;
  onToggleArchiveStatus?: () => void; 
}



const Footer: React.FC<FooterProps> = ({
  owner,
  isArchived,
  onToggleArchiveStatus,
}) => (
  <footer className="footer">
    <div className="detailInfo">
      <p>Detailed Information</p>
      <div className="footerRow">
        <div className="footerColumn">
          <p>Owner</p>
          <div className="userDetail">
            <img src={userImage} alt="User" className="userPhoto" />
            <span>{owner}</span>
          </div>
        </div>
        <div className="footerColumn">
          <p>Category</p>
          <button
  className="archiveButton"
  onClick={onToggleArchiveStatus ? onToggleArchiveStatus : undefined}
  disabled={!onToggleArchiveStatus} 
>
  {isArchived ? "Active" : "Archived"}
</button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
