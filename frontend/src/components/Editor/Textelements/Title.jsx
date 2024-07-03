import React, { useState } from "react";

const Title = ({ value, pagename, setPageName }) => {
  const [title, setTitle] = useState(value);

  const updateTitle = (event) => {
    setTitle(event.target.value);
    if (pagename) {
      setPageName(event.target.value);
    }
  };

  return (
    <input
      onChange={updateTitle}
      value={title}
      type="text"
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        border: "none",
        margin: "1rem",
        padding: "1rem",
        outline: "none", // Hinzugefügt, um den blauen Rahmen zu entfernen
      }}
    />
  );
};

export default Title;
