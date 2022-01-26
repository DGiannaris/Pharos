import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';


describe('Spinner component test', () => {
  const props = {
    isLoading: true
  }

  it('should render Spinner', () => {
    const { container } = render(<Spinner {...props} />)
    expect(container.firstChild).toHaveClass('spinner');
  })

})