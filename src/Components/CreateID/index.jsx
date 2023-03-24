import React from "react";
import "./index.scss";

function CreateID() {
  return (
    <div className="createId-main">
      <div className="createId-main-head"></div>
      <div className="createId-main-body">
        <div className="createId-body-buttons">
          <button className="createId-button">My IDs</button>
          <button className="createId-button">Create ID</button>
        </div>
      </div>
    </div>
  );
}

export default CreateID;
