import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { vi } from 'vitest';

import { useItems } from 'src/hooks/useItems';
import { render, waitFor } from 'src/utils/test-utils';

import SearchItems from '../SearchItems';

import * as data from './dummyItems.json';

describe('search items component', () => {
  const sidebarOnChange = vi.fn();
  const selectedItemOnChange = vi.fn();

  const ItemsContainer = () => {
    const { setItems } = useItems();
    useEffect(() => {
      const { items } = data as any;
      setItems(items);
    }, []);
    return (
      <>
        <SearchItems />
      </>
    );
  };
  const renderComponent = () => render(<ItemsContainer />);

  it('should cancel search onpress escape key', async () => {
    const { getByPlaceholderText } = await waitFor(() => renderComponent());
    const searchInput = getByPlaceholderText(/search items/i) as HTMLInputElement;
    // try to find banana
    userEvent.type(searchInput, 'bana');
    userEvent.keyboard('{esc}');
    expect(searchInput.value).toBe('');
  });

  it('should search items and update the global state', async () => {
    jest.clearAllMocks();
    const { getByPlaceholderText, findAllByTestId } = await waitFor(() => renderComponent());
    const searchInput = getByPlaceholderText(/search items/i);
    // try to find banana
    userEvent.type(searchInput, 'bana');
    const results = await findAllByTestId('search-result');

    //trigger state changes (setSelectedItem, setSidebarMode)
    userEvent.click(results[0]);
    expect(sidebarOnChange).toHaveBeenCalled();
    expect(selectedItemOnChange).toHaveBeenCalled();
  });
});
