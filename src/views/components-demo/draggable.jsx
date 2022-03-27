import React from "react";
import TypingCard from "@/components/TypingCard";
import draggable from "@/assets/images/draggable.gif";
const Draggable = () => {
  const cardContent = `
    You can try to drag some of the navigation menu bar on the left, it can be dragged.
    This DEMO is based on<a href="https://github.com/atlassian/react-beautiful-dnd" target="_blank">react-beautiful-dnd</a>。
    <p><img src="${draggable}"/></p>
  `;
  return (
    <div className="app-container">
      <TypingCard title="List drag" source={cardContent} />
    </div>
  );
};

export default Draggable;
