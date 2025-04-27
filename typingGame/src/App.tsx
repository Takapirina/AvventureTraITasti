import { useSelector } from 'react-redux';
import './App.css';
import StartGame from './screen/StartGame';
import GameMain from './components/GameMain';
import GameOver from './screen/GameOver';

function App() {
  const tempoGlobale = useSelector((state: any) => state.game.tempoGlobale);
  const isGameStarted = useSelector((state: any) => state.game.isGameStarted);

  return (
    <div className="page">
      {!isGameStarted ? (
        <StartGame />
      ) : tempoGlobale > 0 ? (
        <GameMain />
      ) : (
        <GameOver />
      )}
    </div>
  );
}

export default App;