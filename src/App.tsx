import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import CellValue from './types/CellValue';
import Turn from './types/Turn';
import { generateEmptyCells, checkWinPattern } from './utils/Board';
import './App.css';

const emptyIndexArray: number[] = [];

function App() {
  const [ cells, setCells ] = useState(generateEmptyCells());
  const [ highlightCells, setHighlightCells ] = useState(emptyIndexArray);
  const [ turn, setTurn ] = useState(Turn.player1);

  const handleCellClick = useCallback((cellId) => {
    if (cells[cellId] !== CellValue.empty) {
      return;
    }

    const cellNextValue = turn === Turn.player1 ? CellValue.X : CellValue.O;
    const newCells = [ ...cells ];
    newCells[cellId] = cellNextValue;
    setCells(newCells);
  
    const turnStatus = checkWinPattern(newCells);

    if (turnStatus.gameEnd) {
      setHighlightCells(turnStatus.winPattern);
    } else {
      const nextTurn = turn === Turn.player1 ? Turn.player2 : Turn.player1;
      setTurn(nextTurn);
    }
  }, [ cells, turn ]);

  return (
    <div className="wrapper">
      <div className="player-title">Turn: {turn}</div>
      <Board
        cells={cells}
        highlightCells={highlightCells}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

export default App;
