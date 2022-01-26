import * as React from 'react';
import { render } from '@testing-library/react';
import { Tile } from './Tile';
import { stringify } from 'querystring';


describe('Tile component test', () => {
  const props = {
    title: 'DarthVader',
    price: 100
  }

  it('should render Tile', () => {
    const { container, getByText } = render(<Tile {...props} />)
    expect(container.firstChild).toHaveClass('tile');
    expect(getByText('DarthVader')).toBeInTheDocument();
  })

})