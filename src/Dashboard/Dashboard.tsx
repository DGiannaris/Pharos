import * as React from 'react';
import { useData } from '../getters/useData';
import { Navbar } from '../components/Navbar/Navbar';
import { Tile } from '../components/Tile/Tile';
import { Application, sortLayers } from '../common/utils';
import './styles.css';
import { Spinner } from '../components/Spinner/Spinner';

export const Dashboard = () => {

  const { data, loading } = useData(`/data`);
  const [selected, setSelected] = React.useState([] as Application[]);

  const onSelect = (data: Application[]) => {

    const selectedCategory = [...data]; //immutability

    setSelected(sortLayers(selectedCategory));

  }

  return (
    <div className='wrapper'>
      <div className='navWrapper'>
        <div className='titleWrapper'>
          <h1>Pharos Dimitris Giannaris</h1>
          <Spinner isLoading={loading} />
        </div>
        { data && !loading &&
          <Navbar data={data} onSelect={onSelect}  />
        }
      </div>
      <div className='tileWrapper'>
        {
          selected.map((application, idx) => (
            <Tile key={`${application.id}${idx}`} price={application.spend} title={application.name} />
          ))
        }
     </div>
    </div>
  )
}

