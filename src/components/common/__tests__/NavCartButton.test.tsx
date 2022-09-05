import { render } from 'src/utils/test-utils';
import userEvent from '@testing-library/user-event';

import { sidebarState } from 'src/store/sidebar';

import NavCartButton from '../NavCartButton';

describe('NavCartButton component tests', () => {
  // const onChange = jest.fn();
  // const TestComponent = () => {
  //   return (
  //     <RecoilRoot>
  //       <RecoilObserver node={sidebarState} onChange={onChange} />
  //       <NavCartButton />
  //     </RecoilRoot>
  //   );
  // };
  // const prepareElement = () => render(<TestComponent />);
  // it('should display the shopping list item count', () => {
  //   const { getByTestId } = prepareElement();
  //   const count = getByTestId('shoppingListItemCount');
  //   expect(Number(count.innerHTML)).toBeGreaterThanOrEqual(0);
  // });
  // it('should call the function to toggle the sidebar', () => {
  //   const { getByRole } = prepareElement();
  //   const toggleButton = getByRole('button');
  //   userEvent.click(toggleButton);
  //   expect(onChange).toHaveBeenCalled();
  // });
});
