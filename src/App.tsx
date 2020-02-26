import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import CellValue from './types/CellValue';
import Turn from './types/Turn';
import './App.css';

function generateCells() {
  const cells = [];
  for (let i = 0; i < 9; i += 1) {
    cells.push(CellValue.empty);
  }
  return cells;
}

function checkForWin(cells: CellValue[], turn: Turn) {
  if (
    (cells[0] === cells[1] && cells[0] === cells[2] && cells[0] !== CellValue.empty) ||
    (cells[3] === cells[4] && cells[3]=== cells[5] && cells[3] !== CellValue.empty) ||
    (cells[6] === cells[7] && cells[6] === cells[8] && cells[6] !== CellValue.empty) ||
    (cells[0] === cells[3] && cells[0] === cells[6] && cells[0] !== CellValue.empty) ||
    (cells[1] === cells[4] && cells[1] === cells[7] && cells[1] !== CellValue.empty) ||
    (cells[3] === cells[5] && cells[3] === cells[8] && cells[3] !== CellValue.empty) ||
    (cells[0] === cells[4] && cells[0] === cells[8] && cells[0] !== CellValue.empty) ||
    (cells[2] === cells[4] && cells[2] === cells[6] && cells[2] !== CellValue.empty)
  ) {
    alert(`${turn} won!`);
    return true;
  }
  return false;
}

function App() {
  const [ cells, setCells ] = useState(generateCells());
  const [ turn, setTurn ] = useState(Turn.player1);

  const handleCellClick = useCallback((cellId) => {
    if (cells[cellId] !== CellValue.empty) {
      return;
    }

    const cellNextValue = turn === Turn.player1 ? CellValue.X : CellValue.O;
    const newCells = [ ...cells ];
    newCells[cellId] = cellNextValue;

    const nextTurn = turn === Turn.player1 ? Turn.player2 : Turn.player1;

    const playerWon = checkForWin(newCells, turn);
    if (playerWon) {
      setCells(generateCells());
      setTurn(Turn.player1);
    } else {
      setCells(newCells);
      setTurn(nextTurn);
    }
  }, [ cells, turn ]);

  return (
    <div className="wrapper">
      <div>{turn}</div>
      <Board
        cells={cells}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

export default App;
