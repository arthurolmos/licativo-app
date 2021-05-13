import { getArrayFromSnapshot, getFirebaseServerTime } from "../../lib";

const dao = {
  async getDocument(ref: any) {
    const resp = await ref.get();
    const doc = resp.data();
    return doc;
  },

  async getCollection(ref: any) {
    const snapshot = await ref.get();
    const docs = getArrayFromSnapshot(snapshot);
    return docs;
  },

  async createDocument(ref: any, data: any) {
    const docRef = await ref.add(data);

    await ref.doc(docRef.id).update({
      _createdAt: getFirebaseServerTime(),
      _updatedAt: getFirebaseServerTime(),
    });

    return docRef.id;
  },

  async setDocumentWithId(ref: any, data: any) {
    const docRef = await ref.set(data);
    return docRef.id;
  },

  async updateDocument(ref: any, values: any) {
    values._updatedAt = getFirebaseServerTime();
    await ref.update(values);
  },

  async deleteDocument(ref: any) {
    await ref.delete();
  },
};

export default dao;
