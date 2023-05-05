import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import metamask from './metamask.png';

function App() {
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState('');
  const [log, setLog] = useState(false);

  function carteira() {
    //testa se metamask está no navegador do usuário
    if (!window.ethereum) return setError('Nenhuma carteira do MetaMask encontrada!');
    //conexão com metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', [])
      .then(accounts => {
        //quando tem acesso a carteira do usuário retorna o endereço
        if (!accounts || !accounts.length) return setError('Carteira não foi encontrada/permitida.');
        localStorage.setItem('wallet', accounts[0]);
        setWallet(accounts[0]);
        setLog(true);
      })
  };

  const deslog = () => {
      setWallet('');
      setLog(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={metamask} className="App-logo" alt="logo"/>
        <div>
          {!log && 
            <button className="App-button" onClick={carteira}>Endereço Metamask</button>
          }

          <div>
            {wallet}
          </div>
          {log && 
            <button className="App-button" onClick={deslog}>Voltar</button>
          }
          <div>
            {error}
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
