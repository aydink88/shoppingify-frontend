import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, waitForElementToBeRemoved } from 'src/utils/test-utils';

import '@testing-library/jest-dom';
import ShoppingList from '../ShoppingList';

import * as data from './dummyList.json';

const server = setupServer(
  rest.get('/api/shoppinglist/:id', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  })
);

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('shoppinglist component', () => {
  it('should fetch items and render items', async () => {
    const { getByTestId, queryByTestId, getAllByTestId } = render(
      <MemoryRouter initialEntries={[`/shoppinglist/${data._id}`]} initialIndex={0}>
        <ShoppingList />
      </MemoryRouter>
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByTestId('spinner'));
    expect(queryByTestId('spinner')).not.toBeInTheDocument();
    expect(getAllByTestId('list-item-card')).toBeTruthy();
  });
});
