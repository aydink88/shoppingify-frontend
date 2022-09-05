import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as React from 'react';

import '@testing-library/jest-dom';
import { render, waitForElementToBeRemoved } from 'src/utils/test-utils';

import Items from '../Items';

import * as data from './dummyItems.json';

const server = setupServer(
  rest.get('/api/item', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  })
);

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('item component', () => {
  it('should fetch items and render items', async () => {
    const { getByTestId, queryByTestId, getAllByTestId } = render(<Items />);
    expect(getByTestId('spinner')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => queryByTestId('spinner'));
    expect(queryByTestId('spinner')).not.toBeInTheDocument();
    expect(getAllByTestId('itemlist')).toBeTruthy();
  });
});
