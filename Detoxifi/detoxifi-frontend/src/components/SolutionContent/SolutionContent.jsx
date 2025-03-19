/* eslint-disable react/prop-types */
import { useState } from "react";

const SolutionContent = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedContent = content?.slice(0, 500);
  const isLongContent = content?.length > 500;

  return (
    <div className="text-left text-[#3F002A] md:text-xl font-medium">
      {isExpanded || !isLongContent ? content : `${truncatedContent}...`}
      {isLongContent && (
        <span
          onClick={toggleContent}
          className="text-[#3F002A] font-bold cursor-pointer ml-2"
        >
          {isExpanded ? "" : "Read More"}
        </span>
      )}
    </div>
  );
};

export default SolutionContent;