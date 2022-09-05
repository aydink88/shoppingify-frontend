import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';

import { render } from 'src/utils/test-utils';

import '@testing-library/jest-dom';
import Logout from '../Logout';

describe('Logout tests', () => {
  it('should remove the token', () => {
    const { reload } = window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        reload: vi.fn(),
      },
    });
    localStorage.setItem('token', 'dummy token');
    expect(localStorage.getItem('token')).toBe('dummy token');

    const { getByRole } = render(<Logout />);
    userEvent.click(getByRole('button'));
    expect(localStorage.getItem('token')).toBeFalsy();
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    window.location.reload = reload;
  });
});
