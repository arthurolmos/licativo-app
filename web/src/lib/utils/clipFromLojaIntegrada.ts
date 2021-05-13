import { CopyOrderInput } from "../../interfaces";

interface CopyProduct {
  index: number;
  name: string;
  unitPrice: string;
  qty: string;
}

export function clipFromLojaIntegrada(
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

  /*** Name ***/
  init = clipText.search("Cliente");
  end = clipText.search("Tipo de cliente:");
  const name = clipText?.slice(init, end).split("\n")[1]?.replace("\r", "");

  /*** Order Items & Quantity ***/
  init = clipText.search("Valor total");
  end = clipText.search("Total:");

  const itemsText = clipText?.slice(init, end - 2).split("\r\n\r\n");
  itemsText.pop(); //Remove a linha do Envio

  //Removendo a linha "VALOR TOTAL"
  const firstItem = itemsText[0];
  const aux = firstItem?.split("\n");
  aux?.shift();
  const join = aux?.join("\n");
  itemsText[0] = join;

  const products: CopyProduct[] = [];
  itemsText.forEach((item) => {
    const data = item?.split("\n");

    if (data) {
      const index = products.length;
      const name = data[0];
      const unitPrice = data.splice(-2, 1)[0]?.split("\t")[1];
      const qty = data.splice(-1, 1)[0]?.split(" ")[1];

      const product: CopyProduct = {
        index,
        name,
        unitPrice,
        qty,
      };

      products.push(product);
    }
  });

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
  init = clipText.search("Total:");
  end = clipText.search("Observações");
  const price = clipText.slice(init, end).split(" ").pop();

  /*** Order Date ***/
  init = clipText.search("Criado em");
  const orderDate = clipText.slice(init).split(" ")[2]?.slice(0, 10);

  /*** BOTTOM TEXT ***/
  init = clipText.search("Histórico do pedido");
  const bottomText = clipText.slice(init);

  /*** Check if Order is Paid ***/
  end = bottomText.search("Pedido Pago");
  const paymentDate =
    end > 0 ? bottomText.slice(0, end)?.split("\n").pop()?.slice(0, 10) : "";
  const isPaid = paymentDate ? true : false;

  /*** Check if Order is Delivered ***/
  //Por enquanto estou com preguiça, então vai a mesma data do Recebimento...
  end = bottomText.search("Pedido Enviado");
  const deliveryDate =
    end > 0 ? bottomText.slice(0, end)?.split("\n").pop()?.slice(0, 10) : "";
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
