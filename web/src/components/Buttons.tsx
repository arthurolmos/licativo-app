import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  action: (e: React.MouseEvent<HTMLElement>) => void;
  type?: string;
  color?: string;
}

export function DefaultButton(props: Props) {
  const { text, action, color = "lightblue" } = props;

  return (
    <Button
      onClick={(e: React.MouseEvent<HTMLElement>) => action(e)}
      color={color}
    >
      {text}
    </Button>
  );
}


const Button = styled.button<{ color: string }>`
  box-shadow: 0 4px 8px teal;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  border: 1px solid gray;
  color: white;
  font-weight: bold;
  height: 60px;
  width: 200px;
  cursor: pointer;
  margin: 1rem;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }

  @media(max-width: 800px) {
    height: 50px;
    width: 120px;
  }
`;
