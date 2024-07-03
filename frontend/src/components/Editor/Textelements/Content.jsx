import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "@ui5/webcomponents/dist/Title.js";
import { Icon } from "@ui5/webcomponents-react";
import { GrDrag } from "react-icons/gr";
import { Card, CardHeader, Title } from "@ui5/webcomponents-react";

const Content = ({ xmlDocument, setUpdatedContent }) => {
  const [parsedContent, setParsedContent] = useState([]);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeIndex, setResizeIndex] = useState(null);
  const [draggerIsHovered, setDraggerIsHovered] = useState(false);

  useEffect(() => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlDocument, "application/xml");

    const contentElements = Array.from(xml.querySelectorAll("root > *"))
      .map((node, index) => {
        const commonProps = {
          id: `item-${index}`,
          node,
          key: index,
        };

        switch (node.tagName) {
          case "h1":
            return {
              ...commonProps,
              element: (
                <Title
                  level="H1"
                  style={titleStyle("2rem", "#333")}
                  contentEditable
                  onChange={(e) => updateContent(index, e.target.textContent)}
                  onBlur={(e) => updateContent(index, e.target.textContent)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  {node.textContent}
                </Title>
              ),
            };
          case "h2":
            return {
              ...commonProps,
              element: (
                <Title
                  level="H2"
                  style={titleStyle("1.5rem", "#444")}
                  contentEditable
                  onChange={(e) => updateContent(index, e.target.textContent)}
                  onBlur={(e) => updateContent(index, e.target.textContent)}
                >
                  {node.textContent}
                </Title>
              ),
            };
          case "p":
            return {
              ...commonProps,
              element: (
                <p
                  style={paragraphStyle}
                  contentEditable
                  onChange={(e) => updateContent(index, e.target.textContent)}
                  onBlur={(e) => updateContent(index, e.target.textContent)}
                >
                  {node.textContent}
                </p>
              ),
            };
          case "img":
            return {
              ...commonProps,
              element: (
                <div style={imgContainerStyle}>
                  <img
                    src={node.getAttribute("src")}
                    alt={node.getAttribute("alt")}
                    style={imgStyle(node.getAttribute("width"))}
                    onMouseDown={(e) => handleResizeStart(e, index)}
                  />
                </div>
              ),
            };
          case "page":
            return {
              ...commonProps,
              element: (
                <Card
                  header={
                    <CardHeader
                      interactive={true}
                      avatar={<Icon name={node.getAttribute("icon")} />}
                      subtitleText={node.getAttribute("subtitle")}
                      titleText={node.getAttribute("title")}
                      onClick={() => {
                        // navigate to id
                      }}
                    />
                  }
                  style={cardStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              ),
            };
          case "ul":
            return {
              ...commonProps,
              element: (
                <ul style={ulStyle}>
                  {Array.from(node.querySelectorAll("li")).map(
                    (li, liIndex) => (
                      <li
                        style={liStyle}
                        key={liIndex}
                        contentEditable
                        onChange={(e) =>
                          updateContent(index, e.target.textContent, liIndex)
                        }
                        onBlur={(e) =>
                          updateContent(index, e.target.textContent, liIndex)
                        }
                      >
                        {li.textContent}
                      </li>
                    )
                  )}
                </ul>
              ),
            };
          default:
            return null;
        }
      })
      .filter(Boolean);

    setParsedContent(contentElements);
  }, [xmlDocument]);

  const updateContent = (index, newText, liIndex = null) => {
    setParsedContent((prevContent) => {
      const updatedContent = [...prevContent];
      const node = updatedContent[index]?.node;

      if (node) {
        if (liIndex !== null) {
          const liNodes = node.querySelectorAll("li");
          if (liNodes[liIndex]) {
            liNodes[liIndex].textContent = newText;
          }
        } else {
          node.textContent = newText;
        }

        updatedContent[index] = { ...updatedContent[index], node };
        updateXmlStructure(updatedContent);
      }

      return updatedContent;
    });
  };

  const updateXmlStructure = (content) => {
    const xmlDoc = document.implementation.createDocument(null, "root");
    const root = xmlDoc.documentElement;

    content.forEach((item) => {
      if (item.node) {
        root.appendChild(xmlDoc.importNode(item.node, true));
      }
    });

    const serializer = new XMLSerializer();
    const newXmlString = serializer.serializeToString(root);
    setUpdatedContent(newXmlString);
  };

  const titleStyle = (fontSize, color) => ({
    fontSize,
    fontWeight: "bold",
    margin: "0.5rem 0",
    padding: "0.5rem",
    outline: "none",
    color,
    transition: "background-color 0.3s",
  });

  const paragraphStyle = {
    fontSize: "1rem",
    cursor: "text",
    margin: "0.3rem 0",
    padding: "0.3rem",
    outline: "none",
    lineHeight: "1.5",
    color: "#555",
  };

  const imgStyle = (width) => ({
    width: width || "100%",
    borderRadius: "8px",
    margin: "0.5rem 0",
  });

  const imgContainerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const cardStyle = {
    width: "300px",
    margin: "0.5rem",
    padding: "0.5rem",
    transition: "transform 0.3s",
  };

  const ulStyle = {
    margin: "0.5rem",
    padding: "0.5rem",
    border: "none",
    outline: "none",
    listStyleType: "disc",
  };

  const liStyle = {
    fontSize: "1rem",
    cursor: "text",
    outline: "none",
    color: "#666",
    marginBottom: "0.3rem",
  };

  const draggableItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
  };

  const dragHandleStyle = {
    cursor: "grab",
    paddingLeft: "0.1rem",
    paddingRight: "0.2rem",
  };

  const handleResizeStart = (e, index) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeIndex(index);
  };

  const handleResize = (e) => {
    if (isResizing && resizeIndex !== null) {
      const newWidth = e.clientX - e.target.getBoundingClientRect().left;
      updateImageWidth(resizeIndex, `${newWidth}px`);
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeIndex(null);
  };

  const updateImageWidth = (index, newWidth) => {
    setParsedContent((prevContent) => {
      const updatedContent = [...prevContent];
      const node = updatedContent[index]?.node;

      if (node) {
        node.setAttribute("width", newWidth);
        updatedContent[index] = { ...updatedContent[index], node };
        updateXmlStructure(updatedContent);
      }

      return updatedContent;
    });
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
    } else {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(parsedContent);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setParsedContent(items);
    updateXmlStructure(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ padding: "0.5rem" }}
          >
            {parsedContent.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      ...draggableItemStyle,
                    }}
                  >
                    <div style={dragHandleStyle}>
                      <GrDrag
                        onMouseOver={(e) =>
                          e
                            ? setDraggerIsHovered(true)
                            : setDraggerIsHovered(false)
                        }
                        style={{
                          visibility: "hidden",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>{item.element}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Content;
