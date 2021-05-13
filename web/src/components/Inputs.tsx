import React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface ValidationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  action?: (e: any) => void;
  validation?: (
    value: string
  ) => {
    resp: boolean;
    message: string;
  };
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Input = (props: InputProps) => {
  const { label, ...rest } = props;

  return (
    <Container>
      <Label>{props.label}</Label>
      <InputStyled {...rest} />
    </Container>
  );
};

export const ValidationInput = (props: ValidationInputProps) => {
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const { label, validation, action, ...rest } = props;

  const handleValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validation) {
      const { resp, message } = validation(e.target.value);

      if (!resp) {
        setError(true);
        setErrorMessage(message);
      } else {
        clearErrors();
      }
    }
  };

  const clearErrors = () => {
    setError(false);
    setErrorMessage("");
  };

  return (
    <Container>
      <Label>{props.label}</Label>
      <ValidationInputStyled
        {...rest}
        onChange={(e) => {
          clearErrors();
          action && action(e.target.value);
        }}
        onBlur={handleValidation}
        error={error}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export const Select = (props: SelectProps) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <SelectStyled {...props} />
    </Container>
  );
};

export const TextArea = (props: TextAreaProps) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <TextAreaStyled {...props} />
    </Container>
  );
};

export const Toggle = (props: {
  label: string;
  value: boolean;
  toggle: () => void;
  disabled?: boolean;
}) => {
  return (
    <Container direction="column">
      <Label>{props.label}</Label>
      <ToggleButton
        active={props.value}
        onClick={!props.disabled ? props.toggle : () => null}
      >
        <Switch active={props.value} />
      </ToggleButton>
    </Container>
  );
};

const ToggleButton = styled.div<{ active: boolean }>`
  border: 1px solid gray;
  border-radius: 25px;
  height: 30px;
  width: 60px;
  position: relative;
  transition: all 0.5s ease;
  background-color: ${(props) => (props.active ? "lightgreen" : "gray")};
  box-shadow: 0 4px 8px teal;

  cursor: pointer;
  &:hover {
    & > div {
      background-color: pink;
    }
  }
`;

const Switch = styled.div<{ active: boolean }>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  position: absolute;
  z-index: 9;
  transition: all 0.5s ease;
  transform: ${(props) => (props.active ? "translate(30px)" : "translate(0)")};
  background-color: ${(props) => (props.active ? "white" : "lightblue")};
`;

const Container = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  margin: 1rem;
`;

const Label = styled.label`
  margin: 0 0.5rem 0.5rem;
`;

const InputStyled = styled.input`
  height: 30px;
  width: 300px;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: 0 4px 8px teal;
  padding-left: 1rem;
  padding-right: 1rem;

  &:focus {
    outline: none;
  }
`;

const ValidationInputStyled = styled.input<{ error: boolean }>`
  height: 30px;
  width: 300px;
  border-radius: 10px;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid gray")};
  box-shadow: 0 4px 8px teal;
  padding-left: 1rem;
  padding-right: 1rem;

  &:focus {
    outline: none;
  }
`;

const SelectStyled = styled.select`
  height: 30px;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: 0 4px 8px teal;
  padding-left: 1rem;
  padding-right: 1rem;

  &:focus {
    outline: none;
  }
`;

const TextAreaStyled = styled.textarea`
  height: 200px;
  max-height: 200px;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: 0 4px 8px teal;
  padding-left: 1rem;
  padding-right: 1rem;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
  font-size: 12px;
  padding-left: 0.5rem;
`;
