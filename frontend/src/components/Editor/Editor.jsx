import React, { useState, useEffect } from "react";
import Content from "./Textelements/Content";

const Editor = () => {
  const [content, setContent] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [pagename, setPageName] = useState("Editor");

  useEffect(() => {
    fetch("/samplePage.xml")
      .then((response) => response.text())
      .then((data) => {
        setContent(data);
      });
  }, []);

  useEffect(() => {
    setContent(updatedContent);
    console.log(updatedContent);
    //Upload the updated content to the server here ... #TODO
  }, [updatedContent]);

  return (
    <div>
      <Content xmlDocument={content} setUpdatedContent={setUpdatedContent} />
    </div>
  );
};

export default Editor;
