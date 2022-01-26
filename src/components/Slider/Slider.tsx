import * as React from 'react';
import './styles.css';

interface Props {
  min: number;
  max: number;
  range: number;
  onRange: (value: number) => void;
}

/**
 * The slider component, decides how many tiles should be rendered according to selected price
 * @param min The minimum allowed price
 * @param man The maximum allowed price
 * @param range The selected range of prices
 * @param onRange callback function used onChange effect
 */
export const Slider = ({min, max, range, onRange}: Props) => {
  return (
    <div style={{paddingLeft: 20}}>
      <h4 className='selectNone'>Filter by spending:</h4>
      <h5 className='selectNone'>{`Current max: ${range === 0 ? max : range}`}</h5>
      <input 
        className='slider'
        onChange={(event) => onRange(Number(event.target.value))}
        type="range"
        min={`${min}`}
        max={`${max}`}
        step="1"
        value={range || max } 
      />
      <div className='rangeWrapper'>
        <div className='minValue'>{`$${min}`}</div>
        <div className='maxValue'>{`$${max}`}</div>
      </div>
    </div>
  )
}
