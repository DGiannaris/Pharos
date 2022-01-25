import * as React from 'react';
import { useData } from './getters/useData';
import { Navbar } from './components/Navbar/Navbar';


export const Dashboard = () => {

  const { data, loading } = useData(`/data`);
  return (
    <div>
      <h1>Pharos Dimitris Giannaris</h1>
      
      { data && !loading &&
        <Navbar data={data} />
      }
    </div>
  )
}

