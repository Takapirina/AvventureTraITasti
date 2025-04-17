import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import GameMain from './components/GameMain';
import Punteggio from './components/Punteggio';


function App() {
  const tempoGlobale = useSelector((state: any) => state.game.tempoGlobale);
  const listaPokemonCorretti = useSelector((state: any) => state.game.listaPokemonCorretti);

  return (
    <>
      {tempoGlobale > 0 ? (
        <GameMain />
      ) : (
        <div className="game-over">
          <div style={{fontSize:'8rem'}}>Tempo scaduto!</div>
          <div style={{fontSize:'3rem'}}> Pokémon catturati: {listaPokemonCorretti.length}</div>
          <Punteggio/>
        </div>
      )}
    </>
  );
}

export default App;
