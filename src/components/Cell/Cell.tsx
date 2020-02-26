import React from 'react';
import CellValue from '../../types/CellValue';
import './Cell.css';

export interface CellProps {
  value: CellValue,
  id: number,
  onClick: Function,
}

export default function Cell(props: CellProps): React.ReactElement {
  const { value, id, onClick } = props;
  const handleClick = () => onClick(id);

  return (
    <button className="button" onClick={handleClick}>
      {value}
    </button>
  );
}