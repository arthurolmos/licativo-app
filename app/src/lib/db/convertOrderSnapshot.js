import { convertTimestampsToDates } from "../conversors/convertTimestampsToDates";
import { priceFloatToString } from "../conversors/priceFloatToString";

export function convertOrderSnapshot(snapshot = []) {
  const docs = [];

  snapshot.forEach((doc) => {
    let item = doc.data();
    item.id = doc.id;

    item.price = priceFloatToString(item.price);
    item = convertTimestampsToDates(item);

    docs.push(item);
  });

  return docs;
}
