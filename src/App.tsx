import React, { useState, useCallback, useMemo } from 'react';
import Board from './components/Board';
import SubmitButton from './components/SubmitButton';
import CellValue from './types/CellValue';
import Turn from './types/Turn';
import { generateEmptyCells, checkGameStatus } from './utils/Board';
import './App.css';

const emptyIndexArray: number[] = [];

function App() {
  const [ cells, setCells ] = useState(generateEmptyCells());
  const [ highlightCells, setHighlightCells ] = useState(emptyIndexArray);
  const [ turn, setTurn ] = useState(Turn.player1);

  const handleCellClick = useCallback((cellId) => {
    if (turn === Turn.end) {
      return;
    }
    if (cells[cellId] !== CellValue.empty) {
      return;
    }

    const cellNextValue = turn === Turn.player1 ? CellValue.X : CellValue.O;
    const newCells = [ ...cells ];
    newCells[cellId] = cellNextValue;
    setCells(newCells);
  
    const gameStatus = checkGameStatus(newCells);

    if (gameStatus.gameEnd) {
      setHighlightCells(gameStatus.winPattern);
      setTurn(Turn.end);
    } else {
      const nextTurn = turn === Turn.player1 ? Turn.player2 : Turn.player1;
      setTurn(nextTurn);
    }
  }, [ cells, turn ]);

  const handleNewGameClick = useCallback(() => {
    setCells(generateEmptyCells());
    setHighlightCells(emptyIndexArray);
    setTurn(Turn.player1);
  }, []);
  
  const turnLabel = useMemo(() => {
    if (turn === Turn.end) {
      return 'Game finished!';
    }
    return `Turn: ${turn}`;
  }, [ turn ]);

  return (
    <div className="wrapper">
      <div className="player-title">{turnLabel}</div>
      <Board
        cells={cells}
        highlightCells={highlightCells}
        onCellClick={handleCellClick}
      />
      {turn === Turn.end && (
        <SubmitButton
          label="New game"
          onClick={handleNewGameClick}
        />
      )}
    </div>
  );
}

export default App;
