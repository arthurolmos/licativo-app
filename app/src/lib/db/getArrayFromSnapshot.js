export function getArrayFromSnapshot(snapshot = []) {
  const docs = [];

  snapshot.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    docs.push(item);
  });

  return docs;
}
