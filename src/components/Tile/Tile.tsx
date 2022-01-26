import * as React from 'react';
import './styles.css'

interface Props {
  title: string;
  price: number;
}

/**
 * A basic tile component, used to render an array of applications
 * @param title The title of the tile/application form
 * @param price The price of the application
 * @returns 
 */
export const Tile = ({title, price}: Props) => (
  <div className='tile'>
    <h3 className='title'>{title}</h3>
    <p>{`Total spend: $${price}`}</p>
  </div>
);
