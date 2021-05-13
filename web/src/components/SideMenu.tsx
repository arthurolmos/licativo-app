import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {}

const MenuOption = ({
  link,
  title,
  icon,
}: {
  link: string;
  title: string;
  icon: string;
}) => {
  return (
    <LinkStyled to={link}>
      <Option>
        <div>{title}</div>
      </Option>
    </LinkStyled>
  );
};

export function SideMenu(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(true);

  return (
    <Container open={open}>
      <OptionsContainer>
        <MenuOption link="/create" title="Novo Pedido" icon="..." />
        <MenuOption link="/sales" title="Vendas" icon="..." />
        <MenuOption link="/purchases" title="Compras" icon="..." />
      </OptionsContainer>
    </Container>
  );
}

const Container = styled.div<{ open: boolean }>`
  display: flex;
  height: 100vh;
  width: ${(props) => (props.open ? "200px" : "80px")};
  background-color: gray;
  transition: all 0.3s;
  position: fixed;
  top: 0;
  left: 0;
`;

const OptionsContainer = styled.div`
  margin-top: 80px;
  width: 100%;
  heigth: 100px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;
