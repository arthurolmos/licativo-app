import React from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaLessThan,
  FaGreaterThan,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { Purchase, Sale } from "../db/models";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Order<T> = {
  [K in keyof T as string]?: string | boolean;
};

interface Props {
  headers: string[];
  orders: Order<Sale | Purchase>[];
  type: string;
}

export function OrdersTable(props: Props) {
  const { headers, orders, type } = props;

  const [pages, setPages] = React.useState<[JSX.Element][]>([]);
  const [page, setPage] = React.useState(0);

  const rows = React.useMemo(
    () =>
      orders.map((order) => {
        const { id } = order;
        const keys = Object.keys(order);

        return (
          <TableRow
            key={id as string}
            //onClick={() => setOpen(!open)} open={open}
          >
            {keys.map((key) => {
              if (typeof order[key] === "boolean") {
                return (
                  <TableCell key={id + key}>
                    {order[key] === true ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </TableCell>
                );
              } else {
                return <TableCell key={id + key}>{order[key]}</TableCell>;
              }
            })}

            <ActionTableCell>
              <LinkStyled to={`/${type}/${id}/view`}>
                <FaEyeStyled />
              </LinkStyled>
              <LinkStyled to={`/${type}/${id}/edit`}>
                <FaEditStyled />
              </LinkStyled>
              <FaTrashStyled onClick={() => console.log("DELETE")} />
            </ActionTableCell>
          </TableRow>
        );
      }),
    [orders, type]
  );

  const init = pages[page] ? page * 10 + 1 : 0;
  const last = pages[page] ? pages[page].length + page * 10 : 0;
  const total = orders.length;

  const pagesIndex = pages.map((item, index: number) => (
    <Index onClick={() => setPage(index)} selected={index === page} key={index}>
      {index + 1}
    </Index>
  ));

  const pageUp = () => {
    if (page < pages.length - 1) {
      // window.scrollTo(0, 0);
      setPage(page + 1);
    }
  };

  const pageDown = () => {
    if (page > 0) {
      // window.scrollTo(0, 0);
      setPage(page - 1);
    }
  };

  React.useEffect(() => {
    let pages: any[] = [];

    const aux = rows;
    while (aux.length > 0) {
      pages = [...pages, aux.splice(0, 10)];
    }

    setPages(pages);
  }, [rows]);

  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return <TableHeader key={index}>{header}</TableHeader>;
              })}
              <ActionTableHeader>Actions</ActionTableHeader>
            </tr>
          </thead>
          <tbody>{pages[page]}</tbody>
        </Table>
      </TableContainer>
      <Footer>
        <RegisterCounter>
          {`Exibindo ${init} - ${last} de ${total} registros`}
        </RegisterCounter>
        <PageSelector>
          <Index onClick={pageDown}>
            <FaLessThan />
          </Index>
          {pagesIndex}
          <Index onClick={pageUp}>
            <FaGreaterThan />
          </Index>
        </PageSelector>
      </Footer>
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
