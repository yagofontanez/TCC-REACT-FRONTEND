import React, { useEffect, useState } from "react";
import { Container } from "./styleInputCheckbox";

interface propsButton {
  text?: string;
  onClick?: () => void;
  disabled?: any;
  type?: any;
  onChange?: (checked: boolean) => void;
}

const InputCheckbox: React.FC<propsButton> = ({ onChange }) => {
  return (
    <Container>
      <label className="container">
        <input type="checkbox" onChange={(e) => onChange?.(e.target.checked)} />
        <div className="checkmark"></div>
      </label>
    </Container>
  );
};


export default InputCheckbox;
