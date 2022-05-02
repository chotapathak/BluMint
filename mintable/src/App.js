// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NavBar from './NavBar';
import Minting from './Minting';

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <div className="overlay">
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts}>helo</NavBar>
      <Minting accounts={accounts} setAccounts={setAccounts}/>
    </div>
    <div className="moving-background"></div>
    </div>
  );
}

export default App;
