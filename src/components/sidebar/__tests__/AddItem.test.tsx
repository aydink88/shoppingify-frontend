import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { vi } from 'vitest';

import { waitFor, render } from 'src/utils/test-utils';

import AddItem from '../AddItem';

const server = setupServer(
  rest.post('/api/item', (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ item: 'fakeCreatedItem' }));
  })
);

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('sidebar addItem mode', () => {
  const onSidebarChange = vi.fn();
  const onItemsChange = vi.fn();
  const onNotificationChange = vi.fn();

  const TestContainer = () => {
    return (
      <>
        <AddItem />
      </>
    );
  };
  const renderComponent = () => {
    return render(<TestContainer />);
  };

  it('should change sidebar mode if cancel clicked', () => {
    const { getByRole } = renderComponent();
    vi.clearAllMocks();
    const cancelBtn = getByRole('button', { name: 'Cancel' });
    userEvent.click(cancelBtn);
    expect(onSidebarChange).toHaveBeenCalled();
  });

  it('should do nothing if name or category is empty', () => {
    const { getByLabelText, getByRole } = renderComponent();
    vi.clearAllMocks();
    const nameInput = getByLabelText(/name/i);
    const categoryInput = getByLabelText(/category/i);
    const submitBtn = getByRole('button', { name: 'Save' });

    //both fields empty
    userEvent.click(submitBtn);
    expect(onNotificationChange).toHaveBeenCalled();
    expect(onItemsChange).not.toHaveBeenCalled();

    //category empty
    vi.clearAllMocks();
    userEvent.type(nameInput, 'some name');
    userEvent.click(submitBtn);
    expect(onNotificationChange).toHaveBeenCalled();
    expect(onItemsChange).not.toHaveBeenCalled();

    //name empty
    vi.clearAllMocks();
    userEvent.clear(nameInput);
    userEvent.type(categoryInput, 'some category');
    userEvent.click(submitBtn);
    expect(onNotificationChange).toHaveBeenCalled();
    expect(onItemsChange).not.toHaveBeenCalled();
  });

  it('should create new item with valid fields', () => {
    const { getByLabelText, getByRole } = renderComponent();
    vi.clearAllMocks();
    const nameInput = getByLabelText(/name/i);
    const categoryInput = getByLabelText(/category/i);
    const submitBtn = getByRole('button', { name: 'Save' });

    userEvent.type(nameInput, 'some name');
    userEvent.type(categoryInput, 'some category');
    userEvent.click(submitBtn);
    expect(onNotificationChange).not.toHaveBeenCalled();
    waitFor(() => expect(onItemsChange).toHaveBeenCalledWith(['fakeCreatedItem']));
  });
});
