import React from "react";
import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { Purchase, Sale } from "../db/models";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Order<T> = {
  [K in keyof T as string]?: string | boolean;
};

interface Props {
  orders: Order<Sale | Purchase>[];
  type: string;
}

export function OrdersPanel(props: Props) {
  const { orders, type } = props;

  return (
    <Container>
      {orders.map((order) => {
        const name = type === "sales" ? order.customer : order.supplier;

        return (
          <PanelItem key={order.id as string}>
            <Header>
              <Title>{order.product}</Title>
              <ColRight>{order.platform}</ColRight>
            </Header>
            <Row>
              <ColLeft>{name}</ColLeft>
              <ColRight>{order.orderDate}</ColRight>
            </Row>
            <Row>
              <ColLeft>{order.price}</ColLeft>
              <ColRight>
                <div style={{ marginRight: "5px" }}>Pago?</div>
                {order.isPaid ? (
                  <FaCheck style={{ color: "green" }} />
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </ColRight>
            </Row>
            <ActionRow>
              <LinkStyled to={`/${type}/${order.id}/view`}>
                <FaEyeStyled />
              </LinkStyled>
              <LinkStyled to={`/${type}/${order.id}/edit`}>
                <FaEditStyled />
              </LinkStyled>
              <FaTrashStyled onClick={() => console.log("DELETE")} />
            </ActionRow>
          </PanelItem>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
`;

const PanelItem = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 0 8px teal;
  width: 80%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  column-count: 2;
`;

const Title = styled.h3`
  flex: 2;
  padding: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  column-count: 2;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.5rem;
`;

const ColLeft = styled(Col)`
  display: flex;
  flex-direction: row;
  column-count: 2;
`;

const ColRight = styled(Col)`
  justify-content: flex-end;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
`;

const Table = styled.table`
  border-spacing: 2px;
  table-layout: fixed;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  background-color: teal;
  transition: background-color 0.3s;

  &:hover {
    background-color: turquoise;
  }
`;

const ActionTableHeader = styled.th`
  padding: 1rem;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  background-color: teal;
  transition: background-color 0.3s;

  &:hover {
    background-color: turquoise;
  }
`;

const TableRow = styled.tr<{ open?: boolean }>`
  transition: all 0.3s;
  overflow: auto;

  &:hover {
    background-color: aliceBlue;
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid black;
  text-align: center;
`;

const ActionTableCell = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid black;
`;

const FaEyeStyled = styled(FaEye)`
  margin: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const FaEditStyled = styled(FaEdit)`
  margin: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const FaTrashStyled = styled(FaTrash)`
  margin: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

const Index = styled.h2<{ selected?: boolean }>`
  padding: 0.5rem;
  cursor: pointer;

  opacity: ${(props) => (props.selected ? 0.6 : 1)};

  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const RegisterCounter = styled.div`
  display: flex;
  flex: 1;
  font-weight: bold;
`;

const PageSelector = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
