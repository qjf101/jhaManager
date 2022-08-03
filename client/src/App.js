import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import JhaTable from './components/JhaTable';
import CreateJHA from './components/CreateJHA';
import ViewJHA from './components/viewJHA';
import { useState } from 'react';

function App() {
  const [tab, setTab] = useState(0);
  const [editJha, setEditJha] = useState(null);
  const [viewJha, setViewJha] = useState(null);

  return (
    <div className="App">
      <Header/>
      <Nav tab={tab} setTab={setTab} setEditJha={setEditJha} setViewJha={setViewJha}/>
      { viewJha ?
      <ViewJHA viewJha={viewJha}/>:
      <>
      { !tab ?
      <CreateJHA editJha={editJha} setTab={setTab}/> :
      <JhaTable setEditJha={setEditJha} setTab={setTab} setViewJha={setViewJha}/>
      }
      </>
      }
    </div>
  );
}

export default App;
