import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { avviaGioco, setTempoGlobale } from '../store/gameSlice';
import Text from '../components/Text';

const modalitàDisponibili = ['Sfida al Tempo', 'Prossimamente...'];

const StartGame: React.FC = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<number>(120);
  const [modalitàIndex, setModalitàIndex] = useState<number>(0);

  const handleStart = () => {
    dispatch(avviaGioco());
  };

  useEffect(() => {
    dispatch(setTempoGlobale(time));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setTime(prevTime => {
          const newTime = Math.min(prevTime + 10, 180);
          dispatch(setTempoGlobale(newTime));
          return newTime;
        });
      } else if (e.key === 'ArrowDown') {
        setTime(prevTime => {
          const newTime = Math.max(prevTime - 10, 10);
          dispatch(setTempoGlobale(newTime));
          return newTime;
        });
      } else if (e.key === 'ArrowRight') {
        setModalitàIndex(prevIndex => (prevIndex + 1) % modalitàDisponibili.length);
      } else if (e.key === 'ArrowLeft') {
        setModalitàIndex(prevIndex => (prevIndex - 1 + modalitàDisponibili.length) % modalitàDisponibili.length);
      } else if (e.key === 'Enter') {
        handleStart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <div className="start-screen" style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', gap: '30px', justifyContent: 'center'}}>
      <Text nome={`modalita : ${modalitàDisponibili[modalitàIndex]}`}/>
      <Text nome={`${time} s`}/>
    </div>
  );
};

export default StartGame;