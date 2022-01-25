import * as React from 'react';
import './styles.css'

interface Props {
  title: string;
  price: number;
}

export const Tile = ({title, price}: Props) => (
  <div className='tile'>
    <h3 className='title'>{title}</h3>
    <p className='card-price'>{`Total spend: $${price}`}</p>
  </div>
);
