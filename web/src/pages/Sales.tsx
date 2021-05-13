import React from "react";
import { PrivateBodyContainer, OrdersTable, OrdersPanel } from "../components";
import { SalesController } from "../db/controllers";
import { Sale } from "../db/models";
import { priceFloatToString } from "../lib";
import styled from "styled-components";

interface Props {}

export function Sales(props: Props) {
  const [loading, setLoading] = React.useState(true);
  const [sales, setSales] = React.useState<Sale[]>([]);

  const headers: string[] = [
    "id",
    "plataforma",
    "cliente",
    "produtos",
    "data do pedido",
    "preço total",
    "pago?",
    "entregue?",
  ];

  const saleItems = React.useMemo(
    () =>
      sales.map((sale) => {
        const {
          id,
          platform,
          customer,
          product,
          orderDate,
          price,
          isPaid,
          isDelivered,
        } = sale;

        return {
          id: id as string,
          platform,
          customer,
          product,
          orderDate: orderDate.toLocaleDateString(),
          price: priceFloatToString(price),
          isPaid,
          isDelivered,
        };
      }),
    [sales]
  );

  React.useEffect(() => {
    const unregister = SalesController.addObserver(setSales);

    setLoading(false);

    return () => unregister();
  }, []);

  return (
    <PrivateBodyContainer title="Vendas" loading={loading}>
      <>
        <LargeContent>
          <OrdersTable headers={headers} orders={saleItems} type="sales" />
        </LargeContent>
        <SmallContent>
          <OrdersPanel orders={saleItems} type="sales" />
        </SmallContent>
      </>
    </PrivateBodyContainer>
  );
}

const LargeContent = styled.div`
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
`;

const SmallContent = styled.div`
  overflow: hidden;
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;
