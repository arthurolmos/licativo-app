import React from "react";
import { PrivateNavbar, PublicNavbar } from "./Navbars";
import { FaArrowLeft } from "react-icons/fa";
import ReactLoading from "react-loading";
import styled from "styled-components";

export function PrivateBodyContainer({
  title,
  back,
  loading,
  children,
}: {
  title: string;
  back?: Function;
  loading?: boolean;
  children: React.ReactElement;
}) {
  return (
    <Container>
      <PrivateNavbar />

      <Content>
        <Header>
          <Title>
            <h1>{title}</h1>
          </Title>
          {back && (
            <BackButton>
              <FaArrowLeftStyled size={20} onClick={() => back()} />
            </BackButton>
          )}
        </Header>
        <Body>
          {loading ? (
            <ReactLoading
              type="bubbles"
              color="teal"
              height={100}
              width={100}
            />
          ) : (
            children
          )}
        </Body>
      </Content>
    </Container>
  );
}

export function PublicBodyContainer({
  loading,
  children,
}: {
  loading?: boolean;
  children: React.ReactElement;
}) {
  return (
    <Container>
      <PublicNavbar />

      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  max-width: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
  max-width: 100%;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  text-transform: uppercase;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  border: 1px solid gray;
  border-radius: 25px;
  box-shadow: 0 0 20px 0 teal;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`;

const BackButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  column-count: 2;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const FaArrowLeftStyled = styled(FaArrowLeft)`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
