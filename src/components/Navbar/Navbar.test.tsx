import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar component test', () => {
  const props = {
    data: [
      {
        BCAP1: "Koko Lala 1",
        BCAP2: "Koko Lala 1.2",
        BCAP3: "Koko Lala 1.2.3",
        id: "4444",
        name: "Application 1",
        spend: 1444,
      },
      {
        BCAP1: "Koko Lala 1",
        BCAP2: "Koko Lala 1.3",
        BCAP3: "Koko Lala 1.3.1",
        id: "87787",
        name: "Application 2",
        spend: 450,
      },
      {
        BCAP1: "Koko Lala 2",
        BCAP2: "Koko Lala 2.2",
        BCAP3: "Koko Lala 2.2.3",
        id: "123",
        name: "Application 3",
        spend: 9876,
      },
    ],
    onSelect: jest.fn()
  }

  it('should render Navbar', () => {
    const { getAllByRole, getByText } = render(<Navbar {...props} />);

    expect(getAllByRole('listitem')).toHaveLength(8);
    expect(getByText('Koko Lala 1')).toBeInTheDocument();
  })

  it('should call onSelect , well, on select', () => {
    const { getByText } = render(<Navbar {...props} />)

    const link = getByText('Koko Lala 1.3.1');
    

    fireEvent.click(link);
    
    expect(props.onSelect).toBeCalledTimes(1);

    expect(props.onSelect).toHaveBeenCalledWith([
      {
        BCAP1: "Koko Lala 1",
        BCAP2: "Koko Lala 1.3",
        BCAP3: "Koko Lala 1.3.1",
        id: "87787",
        name: "Application 2",
        spend: 450,
      },
    ])
  })
})