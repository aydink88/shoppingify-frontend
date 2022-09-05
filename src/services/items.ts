import client from './client';

export const addItem = async (name: string, note: string, image: string, category: string) => {
  const {
    data: { item },
  }: any = await client.post('/item', { name, note, image, category });

  //return updated user to updateState
  return item;
};

export const destroyItem = (id: string) => {
  return client.delete('/item/' + id);
};

export const getAllItems = async () => {
  const {
    data: { items },
  }: any = await client.get('/item');
  if (items) return items;
};
