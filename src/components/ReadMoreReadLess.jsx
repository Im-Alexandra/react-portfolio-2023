import { useState, useEffect } from "react";
import "./ReadMoreReadLess.css";

export default function ReadMoreReadLess({ children, index }) {
  /* max lines = 3, line height = 1.3, font size = 0.9 => 3 * 0.9 * 1.3 = 3.51em */
  const [heightCurr, setHeightCurr] = useState("auto");
  const [heightHidden, setHeightHidden] = useState("3.51em");
  const [heightExpanded, setHeightExpanded] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = (e) => {
    setIsExpanded((prev) => !prev);
    setHeightCurr(heightExpanded);
    const element = e.target;
    console.log(element.clientHeight);
  };

  useEffect(() => {
    const element = document.getElementById(`text${index}`);
    console.log(element.offsetHeight);
    setHeightExpanded(element.offsetHeight + "px");
    setHeightCurr(heightHidden);
  }, [index]);

  return (
    <div className="read-more-read-less" onClick={handleClick}>
      {/* {isExpanded && <motion.p layout>{children}</motion.p>}
      {!isExpanded && (
        <motion.p layout>{children.substring(0, 100) + " ..."}</motion.p>
      )} */}
      <p
        className="cutoff-text"
        onClick={handleClick}
        id={`text${index}`}
        style={{ maxHeight: heightCurr }}
      >
        {children}
      </p>
      <button
        layout="position"
        key="2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
      {/* <input type="checkbox" className="expand-btn"></input> */}
    </div>
  );
}
