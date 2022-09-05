import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render } from 'src/utils/test-utils';
import '@testing-library/jest-dom';

import NavigationLink from '../NavigationLink';

describe('NavigationLink component tests', () => {
  //const renderComponent = render(<NavigationLink />);
  const routerProps = {
    initialEntries: ['/', '/items'],
    initialIndex: 0,
  };

  it('should navigate to the clicked link and become active', async () => {
    const { findByText, getByText, container } = render(
      <MemoryRouter {...routerProps}>
        <NavigationLink to="/items" tooltip="items">
          <p>items link</p>
        </NavigationLink>
        <Routes>
          <Route path="/" element={<p>main page</p>} />
          <Route path="/items" element={<p>items page</p>} />
        </Routes>
      </MemoryRouter>
    );
    const testLink = getByText(/items link/i);
    userEvent.click(testLink);
    expect(await findByText(/items page/i)).toBeInTheDocument();
    expect(container.querySelector('.selected')).toBeInTheDocument();
  });
});
