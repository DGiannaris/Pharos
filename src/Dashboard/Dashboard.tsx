import * as React from 'react';
import { useData } from '../getters/useData';
import { Navbar } from '../components/Navbar/Navbar';
import './styles.css';


export const Dashboard = () => {

  const { data, loading } = useData(`/data`);
  const [selected, setSelected] = React.useState();
  return (
    <div>
      <h1>Pharos Dimitris Giannaris</h1>
      {console.log(data)}
      { data && !loading &&
        <Navbar data={data}  />
      }
    </div>
  )
}

