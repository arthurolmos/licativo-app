import React from "react";
import {
  PrivateBodyContainer,
  Input,
  Select,
  TextArea,
  Toggle,
  DefaultButton,
} from "../components";
import { UpdateOrderInput, Order } from "../interfaces";
import { SalesController, PurchasesController } from "../db/controllers";
import { Purchase, Sale } from "../db/models";
import { priceFloatToString, priceStringToFloat } from "../lib";
import { useParams, useHistory } from "react-router";
import { DateTime } from "luxon";
import styled from "styled-components";

export function EditOrder() {
  const history = useHistory();

  const {
    orderType,
    orderId,
  }: { orderType: string; orderId: string } = useParams();

  const [loading, setLoading] = React.useState(true);

  const [order, setOrder] = React.useState<Order | null>(null);

  const [type, setType] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [name, setName] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [orderDate, setOrderDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isPaid, setPaid] = React.useState(false);
  const [paymentDate, setPaymentDate] = React.useState("");
  const [isDelivered, setDelivered] = React.useState(false);
  const [deliveryDate, setDeliveryDate] = React.useState("");

  React.useEffect(() => {
    async function getOrder() {
      try {
        setLoading(true);

        let order: Sale | Purchase | null = null;

        if (orderType === "sales") {
          order = await SalesController.findById(orderId);
        } else if (orderType === "purchases") {
          order = await PurchasesController.findById(orderId);
        }

        if (order) setOrder(order);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(`ERROR GETTING ${type}`, err);
      }
    }

    getOrder();
  }, []);

  React.useEffect(() => {
    const data = {
      type: order?.type ? order?.type : "",
      platform: order?.platform ? order?.platform : "",
      name: order?.customer
        ? order?.customer
        : order?.supplier
        ? order?.supplier
        : "",
      product: order?.product ? order?.product : "",
      quantity: order?.quantity ? order?.quantity?.toString() : "",
      price: order?.price ? priceFloatToString(order?.price) : "",
      orderDate: order?.orderDate ? order?.orderDate?.toLocaleDateString() : "",
      notes: order?.notes ? order?.notes : "",
      isPaid: order?.isPaid ? order?.isPaid : false,
      paymentDate: order?.paymentDate
        ? order.paymentDate?.toLocaleDateString()
        : new Date().toLocaleDateString(),
      isDelivered: order?.isDelivered ? order.isDelivered : false,
      deliveryDate: order?.deliveryDate
        ? order.deliveryDate?.toLocaleDateString()
        : new Date().toLocaleDateString(),
    };

    setType(data.type);
    setPlatform(data.platform);
    setName(data.name);
    setProduct(data.product);
    setQuantity(data.quantity);
    setPrice(data.price);
    setOrderDate(data.orderDate);
    setNotes(data.notes);
    setPaid(data.isPaid);
    setPaymentDate(data.paymentDate);
    setDelivered(data.isDelivered);
    setDeliveryDate(data.deliveryDate);
  }, [order]);

  async function update() {
    try {
      const values: UpdateOrderInput = {
        name,
        product,
        quantity: quantity ? parseInt(quantity) : 0,
        price: price ? priceStringToFloat(price) : 0,
        orderDate: DateTime.fromFormat(orderDate, "dd/MM/yyyy").toJSDate(),
        notes,
        isPaid,
        paymentDate: isPaid
          ? DateTime.fromFormat(paymentDate, "dd/MM/yyyy").toJSDate()
          : null,
        isDelivered,
        deliveryDate: isDelivered
          ? DateTime.fromFormat(deliveryDate, "dd/MM/yyyy").toJSDate()
          : null,
      };

      if (
        values.name === "" ||
        values.product === "" ||
        values.quantity <= 0 ||
        values.price <= 0
      ) {
        console.log("INVALID DATA!");
        return;
      }

      setLoading(true);

      console.log("VALUES", values);

      // if (type === "sales") {
      //   await SalesController.update(data);
      // } else if (type === "purchases") {
      //   await PurchasesController.update(data);
      // }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("ERROR SAVING ORDER", err);
    }
  }

  return (
    <PrivateBodyContainer
      title="Editar Pedido"
      loading={loading}
      back={history.goBack}
    >
      <Row>
        <Column>
          <Select
            label="Venda/Compra"
            placeholder="Venda/Compra"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={true}
          >
            <option value="sales">Venda</option>
            <option value="purchases">Compra</option>
          </Select>

          <Select
            label="Plataforma"
            placeholder="Plataforma"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            disabled={true}
          >
            <option value="Site">Site</option>
            <option value="Instagram">Instagram</option>
            <option value="Shopee">Shopee</option>
            <option value="Mercado Livre">Mercado Livre</option>
            <option value="WhatsApp">WhatsApp</option>
          </Select>

          <Input
            label="Nome"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Produto"
            placeholder="Produto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <Input
            label="Quantidade"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value.replace(/[^0-9]/g, ""));
            }}
          />
          <Input
            label="Preço"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
          />

          <Input
            label="Data do Pedido"
            placeholder="Data do Pedido"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </Column>

        <Column>
          <TextArea
            label="Observações"
            placeholder="Observações"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Row>
            <Column>
              <Toggle
                label="Pago?"
                value={isPaid}
                toggle={() => setPaid(!isPaid)}
              />
            </Column>
            <Column>
              {isPaid && (
                <Input
                  label="Data do Pagamento"
                  placeholder="Data do Pagamento"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              )}
            </Column>
          </Row>

          <Row>
            <Column>
              <Toggle
                label="Entregue?"
                value={isDelivered}
                toggle={() => setDelivered(!isDelivered)}
              />
            </Column>
            <Column>
              {isDelivered && (
                <Input
                  label="Data da Entrega"
                  placeholder="Data da Entrega"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              )}
            </Column>
          </Row>

          <ButtonRow>
            <DefaultButton action={update} text="Salvar" color="lightgreen" />
            <DefaultButton
              action={() => history.goBack()}
              text="Cancelar"
              color="red"
            />
          </ButtonRow>
        </Column>
      </Row>
    </PrivateBodyContainer>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  column-count: 2;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 800px) {
    column-count: 2;
    flex-direction: row;
  }
`;
