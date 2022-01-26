import * as React from 'react';
import { useData } from '../getters/useData';
import { Navbar } from '../components/Navbar/Navbar';
import { Tile } from '../components/Tile/Tile';
import { Application, sortLayers } from '../common/utils';
import { Slider } from '../components/Slider/Slider';
import { Spinner } from '../components/Spinner/Spinner';
import './styles.css';

/**
 * Main component, that wraps and renders the widgets
 * @returns 
 */
export const Dashboard = () => {

  const { data = [], loading } = useData(`/data`);
  const [displayed, setDisplayed] = React.useState([] as Application[]);
  const [max, setMax] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [truth, setTruth] = React.useState([] as Application[]);
  const [rangeValue, setRangeValue] = React.useState(0);

  React.useEffect(() => {
    const dataMax = (data && Math.max.apply(Math, data.map((o: Application) => o.spend))) || 1;
    const dataMin = (data && Math.min.apply(Math, data.map((o: Application) => o.spend))) || 0;
    setMax(dataMax);
    setMin(dataMin);
  },[data]);


  const onSelect = (data: Application[]) => {
    const selectedCategory = [...data]; //immutability
    const selectedCategoryToSort = [...data]; //immutability
    const sortedCategory = selectedCategoryToSort.sort((a,b) => (a.spend > b.spend) ? 1 : ((b.spend > a.spend) ? -1 : 0));
    setMax(sortedCategory[sortedCategory.length -1].spend)
    setMin(sortedCategory[0].spend)
    setDisplayed(sortLayers(selectedCategory));
    setTruth(sortLayers(selectedCategory));
  }

  const onRange = (value: number) => {
    setRangeValue(value);
    const rangedSelected = [...truth];
    const rangedData = rangedSelected.filter((application) => application.spend <= value );
    setDisplayed(rangedData);
  }

  return (
    <div className='wrapper'>
      <div className='navWrapper'>
        <div className='titleWrapper'>
          <h1>Pharos Dimitris Giannaris</h1>
          <Spinner isLoading={loading} />
        </div>
        { 
          data && !loading &&
          <Navbar data={data} onSelect={onSelect}  />
        }
        { 
          data &&
          <Slider min={min} max={max} range={rangeValue} onRange={onRange} />
        }
      </div>
      <div className='tileWrapper'>
        {
          displayed.map((application, idx) => (
            <Tile key={`${application.id}${idx}`} price={application.spend} title={application.name} />
          ))
        }
     </div>
    </div>
  )
}

