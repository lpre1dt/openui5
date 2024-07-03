import React, { useState } from "react";

const Title = ({ value, textContent, setTextContent }) => {
  const [text, setText] = useState(value);

  const updateText = (event) => {
    setText(event.target.value);
    if (textContent) {
      setTextContent(event.target.value);
    }
  };

  return (
    <input
      onChange={updateText}
      value={text}
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

export default Text;
