import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { render } from 'src/utils/test-utils';

import ItemList from '../ItemList';

describe('itemlist component', () => {
  const itemsWithCategory: any = [
    'Pasta/Rice',
    [
      {
        _id: '6196c5793c020360c56989b7',
        name: 'spaghetti',
        category: {
          _id: '6196c5793c020360c5698960',
          name: 'Pasta/Rice',
          user: '6196c5773c020360c5698951',
          __v: 0,
        },
        user: '6196c5773c020360c5698951',
        __v: 0,
      },
      {
        _id: '6196c5793c020360c56989b8',
        name: 'macaroni',
        category: {
          _id: '6196c5793c020360c5698960',
          name: 'Pasta/Rice',
          user: '6196c5773c020360c5698951',
          __v: 0,
        },
        user: '6196c5773c020360c5698951',
        __v: 0,
      },
      {
        _id: '6196c5793c020360c56989b9',
        name: 'noodles',
        category: {
          _id: '6196c5793c020360c5698960',
          name: 'Pasta/Rice',
          user: '6196c5773c020360c5698951',
          __v: 0,
        },
        user: '6196c5773c020360c5698951',
        __v: 0,
      },
      {
        _id: '6196c5793c020360c56989ba',
        name: 'white rice',
        category: {
          _id: '6196c5793c020360c5698960',
          name: 'Pasta/Rice',
          user: '6196c5773c020360c5698951',
          __v: 0,
        },
        user: '6196c5773c020360c5698951',
        __v: 0,
      },
    ],
  ];

  const cardOnClick = vi.fn() as any;

  const renderComponent = () =>
    render(<ItemList itemWithCat={itemsWithCategory} onClick={cardOnClick} />);

  it('should render all items', () => {
    const { queryAllByTestId, getByText } = renderComponent();
    expect(getByText(itemsWithCategory[0])).toBeInTheDocument();
    expect(queryAllByTestId('list-item-card').length).toBe(itemsWithCategory[1].length);
  });

  it('should call the click function with the correct item', () => {
    const { getAllByRole } = renderComponent();
    const addButtons = getAllByRole('button');
    userEvent.click(addButtons[0]);
    expect(cardOnClick).toHaveBeenCalledWith(itemsWithCategory[1][0]);
  });
});
