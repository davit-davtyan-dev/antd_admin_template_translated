import React from "react";
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import { Button } from "antd";
import TypingCard from '@/components/TypingCard'
import steps from "./steps";
const driver = new Driver({
  animate: true, // Do you set an animation when changing the highlighted element,
                  // When the header's position is fixed, it will cover the element, which is the bug of Driver.js,
                  // See the details https://github.com/kamranahmedse/driver.js/issues/97
  opacity: 0.75, // Background opacity (0 means only pop-up windows, no coverage)
  doneBtnText: "Finish", // The text on the last button
  closeBtnText: "closure", // The text on the "Close" button of this step
  nextBtnText: "Next step", // Next step button text
  prevBtnText: "Previous", // Previous button for this step text
});

const guide = function () {
  driver.defineSteps(steps);
  driver.start();
};
const Guide = function () {
  const cardContent = `Boot page is useful for some people entering the project, you can briefly introduce the functionality of the project.
                       This DEMO is based on<a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>`
  return (
    <div className="app-container">
      <TypingCard title="Beginner's guide" source={cardContent}/>
      <Button type="primary" onClick={guide}>
        Open boot
      </Button>
    </div>
  );
};

export default Guide;
