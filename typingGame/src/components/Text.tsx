import React from "react"
import '../style/text.css'

interface TestoProps {
  nome: string;
}

const Text: React.FC<TestoProps> = ({ nome }) => {
  return (
    <div className="pokemonName-container">
      <div className="textCyber">{nome.toUpperCase()}</div>
    </div>
  );
};

export default Text;