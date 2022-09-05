import { vi } from 'vitest';

import TopBars from 'src/components/stats/TopBars';
import { render, waitFor } from 'src/utils/test-utils';

describe('Top things chart using colored bars', () => {
  const mockItems = [
    { _id: 1, name: 'banana', amount: 3 },
    { _id: 2, name: 'apple', amount: 6 },
    { _id: 3, name: 'kiwi', amount: 4 },
    { _id: 4, name: 'cherry', amount: 1 },
  ];
  const fetchData = vi.fn().mockResolvedValue(mockItems);

  const renderComponent = () =>
    render(<TopBars fetchData={fetchData} title="Top Fruits" variant="success" />);

  it('should match snapshot', async () => {
    const { container } = await waitFor(renderComponent);
    expect(container).toMatchSnapshot();
  });

  it('should render data', async () => {
    const { findAllByTestId } = renderComponent();
    const items = await findAllByTestId('topbarsmember');
    expect(items.length).toBe(3);
  });
});
