import client from './client';

export const fetchTopItems = async () => {
  try {
    const response: any = await client.get('/shoppinglist/topitems');
    return response.data;
  } catch (_) {
    throw 'Fetching top items failed.';
  }
};

export const fetchTopCategories = async () => {
  try {
    const response: any = await client.get('/shoppinglist/topCategories');
    // backend sends category name in _id property
    return response.data.map((i: any) => ({ ...i, name: i._id }));
  } catch (_) {
    throw 'Fetching top categories failed.';
  }
};

export const fetchMonthlySummary = async () => {
  try {
    const response: any = await client.get('/shoppinglist/monthly');
    return response.data;
  } catch (err) {
    throw 'Fetching monthly summary failed.';
  }
};
