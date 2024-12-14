import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import "../styles.css";

const Profile: React.FC = () => {
  const { user, setUser } = useUserContext();
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.photo || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPhoto(reader.result as string); // Convert image to Base64 string
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!user?.id) {
      alert("User ID is missing. Unable to update profile.");
      return;
    }
  
    const updatedUser = {
      id: user.id || "default-id", // Add a fallback ID here
      name,
      photo,
    };
  
    setUser(updatedUser); // Update user in context
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Save to localStorage
    alert("Profile updated!");
  };
  

  return (
    <div className="auth-form">
      <h2>Profile Details</h2>
      <form>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="input-field">
          <label htmlFor="photo">Profile Picture</label>
          <div className="profileImageContainer">
            <img
              src={photo || "/default-profile.png"} // Default placeholder image
              alt="Profile"
              className="profileImagePreview"
            />
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <button type="button" className="formButton" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
