import { render } from '@testing-library/react';

import Tickets from './tickets';

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tickets />);
    expect(baseElement).toBeTruthy();
  });

  it('should default the completed checkbox to unchecked', () => {
    const { getByLabelText } = render(<Tickets />);
    const checkbox = getByLabelText('Completed');
    expect(checkbox).toHaveProperty('checked', false);
  });

  it('should default the uncompleted checkbox to checked', () => {
    const { getByLabelText } = render(<Tickets />);
    const checkbox = getByLabelText('Not Completed');
    expect(checkbox).toHaveProperty('checked', true);
  });
});
