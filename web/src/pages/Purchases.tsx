import React from "react";
import { PrivateBodyContainer, OrdersTable, OrdersPanel } from "../components";
import { PurchasesController } from "../db/controllers";
import { Purchase } from "../db/models";
import { priceFloatToString } from "../lib";
import styled from "styled-components";

interface Props {}

export function Purchases(props: Props) {
  const [loading, setLoading] = React.useState(true);
  const [purchases, setPurchases] = React.useState<Purchase[]>([]);

  const headers: string[] = [
    "id",
    "plataforma",
    "vendedor",
    "produtos",
    "data do pedido",
    "preço total",
    "pago?",
    "entregue?",
  ];

  const purchaseItems = React.useMemo(
    () =>
      purchases.map((sale) => {
        const {
          id,
          platform,
          supplier,
          product,
          orderDate,
          price,
          isPaid,
          isDelivered,
        } = sale;

        return {
          id: id as string,
          platform,
          supplier,
          product,
          orderDate: orderDate.toLocaleDateString(),
          price: priceFloatToString(price),
          isPaid,
          isDelivered,
        };
      }),
    [purchases]
  );

  React.useEffect(() => {
    const unregister = PurchasesController.addObserver(setPurchases);

    setLoading(false);

    return () => unregister();
  }, []);

  return (
    <PrivateBodyContainer title="Compras" loading={loading}>
      <>
        <LargeContent>
          <OrdersTable
            headers={headers}
            orders={purchaseItems}
            type="purchases"
          />
        </LargeContent>
        <SmallContent>
          <OrdersPanel orders={purchaseItems} type="purchases" />
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
