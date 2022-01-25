import * as React from 'react';
import './styles.css';


type Props = {
  isLoading?: boolean,
}

export const Spinner = ({
   isLoading
}: Props) => {
  return (
    isLoading ? <div className='spinner' /> : <div style={{width: 40}}/>
  )
}
