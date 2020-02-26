import React from 'react';
import Cell from '../Cell';
import CellValue from '../../types/CellValue';
import './Board.css';

interface BoardProps {
  cells: CellValue[],
  onCellClick: Function,
}

export default function Board(props: BoardProps): React.ReactElement {
  const { cells, onCellClick } = props;

  return (
    <div className="board">
      {cells.map((cell, index) => (
        <Cell
          key={`cell${index}`}
          id={index}
          value={cell}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
}