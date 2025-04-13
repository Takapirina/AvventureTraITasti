import React, { useEffect, useState } from "react";
import '../style/text.css';

interface TextProps {
  word: string;
}

const FeedbackText: React.FC<TextProps> = ({ word }) => {

  return (
    <div className="feedback-container" key={word}>
      <div className="text-container">
        <div
          className="textfeedback"
        >
          {word.toUpperCase()}
        </div>
        <div
          className="textfeedback2"
        >
          {word.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default FeedbackText;