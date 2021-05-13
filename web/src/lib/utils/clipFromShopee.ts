import { CopyOrderInput } from "../../interfaces";

export function clipFromShopee(
  clipText: string,
  cb: ({
    name,
    product,
    quantity,
    price,
    orderDate,
    notes,
  }: CopyOrderInput) => void
) {
  if (!clipText) return;

  let init;
  let end;

  /*** HEADER ***/
  init = clipText.search("ID do Pedido");
  end = clipText.search("Informações de Pagamento");
  const headerText = clipText.slice(init, end);

  /*** Name ***/
  const name = headerText?.split("\n").splice(-3, 1)[0]?.replace("\r", "");

  /*** ORDER INFO ***/
  init = clipText.search("Informações de Pagamento");
  end = clipText.search("Pagamento do comprador");
  const orderText = clipText.slice(init, end);

  /*** Order Items & Quantity ***/
  init = orderText.search("Subtotal");
  end = orderText.search("Subtotal de mercadoria");
  const items = orderText?.slice(init, end - 1).split("\n");
  items.shift();

  const products = [];
  let i = 0;
  while (i < items.length - 1) {
    let product = {
      index: items[i++]?.replace("\r", ""),
      name: items[i++]?.replace("\r", ""),
      unitPrice: items[i++]?.replace("\r", ""),
      qty: items[i++]?.replace("\r", ""),
      totalPrice: items[i++]?.replace("\r", ""),
    };

    products.push(product);
  }

  let product;
  if (products.length === 1) {
    product = products[0].name;
  } else {
    product = products.length + " Peças";
  }

  const quantity = products.length;

  /*** Notes ***/
  let notes = "";
  if (products.length > 1) {
    const noteItems = products.map((product) => {
      return product.qty + " " + product.name + " " + product.unitPrice + "\n";
    });

    notes = noteItems.join("\n");
  }

  /*** Total Price ***/
  const price = orderText?.split("\n")?.splice(-2, 1)[0].replace("\r", "");

  /*** BOTTOM TEXT ***/
  init = clipText.search("HISTÓRICO DE PEDIDOS");
  const bottomText = clipText.slice(init);

  /*** Order Date ***/
  init = bottomText.search("Novo pedido");
  const orderDate = bottomText.slice(init).split("\n")[1]?.slice(0, 10);

  /*** Check if Order is Paid ***/
  init = bottomText.search(
    "O Pedido foi recebida e o pagamento está a ser processado."
  );
  const paymentDate =
    init > 0 ? bottomText.slice(init).split("\n")[1].slice(0, 10) : "";
  const isPaid = paymentDate ? true : false;

  /*** Check if Order is Delivered ***/
  //Por enquanto estou com preguiça, então vai a mesma data do Recebimento...
  init = bottomText.search(
    "O Pedido foi recebida e o pagamento está a ser processado."
  );
  const deliveryDate =
    init > 0 ? bottomText.slice(init)?.split("\n")[1].slice(0, 10) : "";
  const isDelivered = deliveryDate ? true : false;

  //Finishing
  if (!name || !product || !quantity || !price || !orderDate) {
    console.log("BAD FORMATTED!");
  } else {
    cb({
      name,
      product,
      quantity: quantity.toString(),
      price,
      orderDate,

      notes,
      isPaid,
      paymentDate: isPaid && paymentDate ? paymentDate : null,
      isDelivered,
      deliveryDate: isDelivered && deliveryDate ? deliveryDate : null,
    });
  }
}
