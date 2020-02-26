import React from 'react';
import Cell from '../Cell';
import CellValue from '../../types/CellValue';
import './Board.css';

interface BoardProps {
  cells: CellValue[],
  highlightCells: number[],
  onCellClick: Function,
}

export default function Board(props: BoardProps): React.ReactElement {
  const { cells, highlightCells, onCellClick } = props;

  return (
    <div className="board">
      {cells.map((cell, index) => {
        const highlight = highlightCells.indexOf(index) > -1;

        return (
          <Cell
            key={`cell${index}`}
            id={index}
            value={cell}
            highlight={highlight}
            onClick={onCellClick}
          />
        )
      })}
    </div>
  );
}