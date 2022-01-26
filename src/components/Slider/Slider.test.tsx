import * as React from 'react';
import { render } from '@testing-library/react';
import { Slider } from './Slider';


describe('Slider component test', () => {
  const props = {
    min: 200,
    max: 1500,
    range: 650,
    onRange: jest.fn()
  }

  it('should render slider component', () => {
    const { getByRole } = render(<Slider {...props} />)
    expect(getByRole('slider')).toBeInTheDocument();
  })

  it('should format min price correctly', () => {
    const { getByText } = render(<Slider {...props} />)
    expect(getByText('$200')).toBeInTheDocument();
  })

  it('should format selected price correctly', () => {
    const { getByText } = render(<Slider {...props} />)
    expect(getByText('$1500')).toBeInTheDocument();
  })
})