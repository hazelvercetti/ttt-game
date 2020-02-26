import React from 'react';
import './SubmitButton.css';

export interface SubmitButtonProps {
  label: string,
  onClick: Function,
}

export default function SubmitButton(props: SubmitButtonProps): React.ReactElement {
  const { label, onClick } = props;
  const handleClick = () => onClick();

  return (
    <button className="submit-button" onClick={handleClick}>
      {label}
    </button>
  );
}