import React from "react";
import {
  PrivateBodyContainer,
  Input,
  Select,
  TextArea,
  Toggle,
  DefaultButton,
} from "../components";
import {
  clipFromShopee,
  clipFromLojaIntegrada,
  priceStringToFloat,
} from "../lib";
import { CopyOrderInput, CreateOrderInput } from "../interfaces";
import { SalesController, PurchasesController } from "../db/controllers";
import { DateTime } from "luxon";
import styled from "styled-components";

export function CreateOrder() {
  const [loading, setLoading] = React.useState(false);

  const [type, setType] = React.useState("sales");
  const [platform, setPlatform] = React.useState("Site");

  const [name, setName] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [orderDate, setOrderDate] = React.useState(
    new Date().toLocaleDateString()
  );
  const [notes, setNotes] = React.useState("");
  const [isPaid, setPaid] = React.useState(false);
  const [paymentDate, setPaymentDate] = React.useState(
    new Date().toLocaleDateString()
  );
  const [isDelivered, setDelivered] = React.useState(false);
  const [deliveryDate, setDeliveryDate] = React.useState(
    new Date().toLocaleDateString()
  );

  function setFieldsFromClipText({
    name,
    product,
    quantity,
    price,
    orderDate,
    notes,
    isPaid,
    paymentDate,
    isDelivered,
    deliveryDate,
  }: CopyOrderInput) {
    setName(name);
    setProduct(product);
    setQuantity(quantity);
    setPrice(price);
    setOrderDate(orderDate);

    setNotes(notes);
    setPaid(isPaid);
    paymentDate && setPaymentDate(paymentDate);
    setDelivered(isDelivered);
    deliveryDate && setDeliveryDate(deliveryDate);
  }

  function clearFields() {
    setName("");
    setProduct("");
    setQuantity("");
    setPrice("");
    setOrderDate(new Date().toLocaleDateString());

    setNotes("");
    setPaid(false);
    setPaymentDate(new Date().toLocaleDateString());
    setDelivered(false);
    setDeliveryDate(new Date().toLocaleDateString());
  }

  const pasteFromClipboard = () => {
    navigator.clipboard.readText().then((clipText) => {
      switch (platform) {
        case "Site":
          clipFromLojaIntegrada(clipText, setFieldsFromClipText);
          break;
        case "Shopee":
          clipFromShopee(clipText, setFieldsFromClipText);
          break;
        case "Mercado Livre":
          break;
        default:
          console.log("BAD FORMATTED!");
      }
    });
  };

  async function submit() {
    try {
      const data: CreateOrderInput = {
        name,
        product,
        quantity: parseInt(quantity),
        price: priceStringToFloat(price),
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
        type,
        platform,
      };

      setLoading(true);

      if (type === "sales") {
        await SalesController.create(data);
      } else if (type === "purchases") {
        await PurchasesController.create(data);
      }

      clearFields();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("ERROR SAVING ORDER", err);
    }
  }

  React.useEffect(() => {
    clearFields();
  }, [type]);

  return (
    <PrivateBodyContainer title="Novo Pedido" loading={loading}>
      <Row>
        <Column>
          <Select
            label="Venda/Compra"
            placeholder="Venda/Compra"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="sales">Venda</option>
            <option value="purchases">Compra</option>
          </Select>

          <Select
            label="Plataforma"
            placeholder="Plataforma"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
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

          {platform === "Shopee" ||
          platform === "Mercado Livre" ||
          platform === "Site" ? (
            <Row>
              <DefaultButton
                action={pasteFromClipboard}
                text={`Colar de ${platform}!`}
              />
              <div style={{ padding: "1rem" }}>
                Vá para a página do pedido em {platform} <br />
                Ctrl + A para selecionar a página e Ctrl + C para copiar
                <br />
                Aperte no botão para colar!
              </div>
            </Row>
          ) : null}

          <ButtonRow>
            <DefaultButton action={submit} text="Salvar" color="lightgreen" />
            <DefaultButton action={clearFields} text="Limpar" color="red" />
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
