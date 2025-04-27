import { useEffect, useState } from 'react';
import '../style/text.css';

interface TextProps {
  word: string;
}

const FeedbackText: React.FC<TextProps> = ({ word }) => {
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [word]);

  return (
    <div className="feedback-container">
      <div className="text-container">
        <div
          className={`textCyber feedback ${word.toLowerCase()}`} 
          key={animationKey}
        >
          {word.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default FeedbackText;