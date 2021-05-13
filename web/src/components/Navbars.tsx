import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";

interface Option {
  title: string;
  link: string;
}

const privateMenuOptions: Option[] = [
  { title: "Novo Pedido", link: "/create" },
  { title: "Vendas", link: "/sales" },
  { title: "Compras", link: "/purchases" },
];

const publicMenuOptions: Option[] = [
  { title: "Home", link: "/" },
  { title: "Login", link: "/login" },
  { title: "Registre-se", link: "/register" },
];

const PrivateHamburgerButton = ({ options }: { options: Option[] }) => {
  const { logout } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Hamburger active={open} onClick={toggle}>
      <FaBars />
      <PrivateOptionsMenu open={open}>
        {options.map((option) => {
          return (
            <MenuOption key={option.title}>
              <LinkStyled to={option.link}>{option.title}</LinkStyled>
            </MenuOption>
          );
        })}
        <MenuOption style={{ borderTop: "1px solid black" }}>
          <Button onClick={() => logout()}>Sair</Button>
        </MenuOption>
      </PrivateOptionsMenu>
    </Hamburger>
  );
};

const PublicHamburgerButton = ({ options }: { options: Option[] }) => {
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Hamburger active={open} onClick={toggle}>
      <FaBars />
      <PublicOptionsMenu open={open}>
        {options.map((option) => {
          return (
            <MenuOption key={option.title}>
              <LinkStyled to={option.link}>{option.title}</LinkStyled>
            </MenuOption>
          );
        })}
      </PublicOptionsMenu>
    </Hamburger>
  );
};

export function PrivateNavbar() {
  const { logout } = React.useContext(AuthContext);

  const menuOptions = privateMenuOptions;

  return (
    <Container>
      <Link to="/">
        <LogoContainer>
          <Logo src="/logo.jpg" alt="licativo" />
        </LogoContainer>
      </Link>
      <SearchBar></SearchBar>
      <ButtonsContainer>
        <Options>
          {menuOptions.map((option) => {
            return (
              <MenuOption key={option.title}>
                <LinkStyled to={option.link}>{option.title}</LinkStyled>
              </MenuOption>
            );
          })}
          <MenuOption>
            <Button onClick={() => logout()}>Sair</Button>
          </MenuOption>
        </Options>
        <PrivateHamburgerButton options={menuOptions} />
      </ButtonsContainer>
    </Container>
  );
}

export function PublicNavbar() {
  const menuOptions = publicMenuOptions;

  return (
    <Container>
      <Link to="/">
        <LogoContainer>
          <Logo src="/logo.jpg" alt="licativo" />
        </LogoContainer>
      </Link>
      <SearchBar></SearchBar>
      <ButtonsContainer>
        <Options>
          {menuOptions.map((option) => {
            return (
              <MenuOption key={option.title}>
                <LinkStyled to={option.link}>{option.title}</LinkStyled>
              </MenuOption>
            );
          })}
        </Options>
        <PublicHamburgerButton options={menuOptions} />
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 0 20px 0 teal;
  min-height: 60px;
  max-height: 60px;

  padding: 1rem 3rem;
  z-index: 999;
`;

const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 120px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SearchBar = styled.div`
  display: flex;
  flex: 1;

  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;

  justify-content: flex-end;
  align-items: center;
`;

const Options = styled.div`
  display: flex;

  justify-content: flex-end;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Hamburger = styled.div<{ active: boolean }>`
  display: none;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  border-radius: 15px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  position: relative;

  background-color: ${(props) => (props.active ? "lightgray" : "white")};
  box-shadow: ${(props) =>
    props.active ? "inset 2px 2px 10px gray" : "2px 2px 8px teal"};

  @media (max-width: 900px) {
    display: flex;
  }
`;

const OptionsMenu = styled.div<{ open: boolean }>`
  list-style: none;
  display: none;
  background-color: white;
  flex-direction: column;
  flex-wrap: nowrap;
  position: absolute;
  top: 50px;
  right: 0;
  overflow: hidden;
  transition: height 0.3s ease;
  box-shadow: 5px 5px 10px gray;
  margin: 0;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const PrivateOptionsMenu = styled(OptionsMenu)`
  height: ${(props) => (props.open ? "220px" : "0")};
`;

const PublicOptionsMenu = styled(OptionsMenu)`
  height: ${(props) => (props.open ? "160px" : "0")};
`;

const MenuOption = styled.div`
  padding: 1rem;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  transition: all 0.1s;
  white-space: nowrap;

  &:hover {
    font-weight: bold;
  }

  @media (max-width: 900px) {
    margin-left: 0;
  }
`;

const Button = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    font-weight: bold;
  }
`;
