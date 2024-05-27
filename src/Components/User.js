// UserComponent.js
import React from "react";

function UserComponent({ username }) {
  return (
    <div style={{ position: "fixed", top: 0, right: 0, padding: "10px" }}>
      Welcome, {username}!
    </div>
  );
}

export default UserComponent;

