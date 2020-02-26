import React from 'react';
import CellValue from '../../types/CellValue';
import './Cell.css';

export interface CellProps {
  value: CellValue,
  id: number,
  highlight?: boolean,
  onClick: Function,
}

export default function Cell(props: CellProps): React.ReactElement {
  const { value, id, onClick, highlight } = props;
  const handleClick = () => onClick(id);
  const classNames = `button ${highlight ? 'active' : ''}`
  return (
    <button className={classNames} onClick={handleClick}>
      {value}
    </button>
  );
}