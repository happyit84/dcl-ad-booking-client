import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { DisplayMask } from "./DisplayMask";
import { Button } from "./Button";

function App() {
  const [installed, setInstalled] = useState<boolean>(false);
  const { active, account, activate, deactivate } = useWeb3React();
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
  });

  const connect = async () => {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", "true");
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const { ethereum }: any = window;

    if (ethereum && ethereum.isMetaMask) {
      setInstalled(true);
    } else {
      setInstalled(false);
    }

    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", "true");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);

  const downloadApp = () =>
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related?hl=en"
    );
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        
        { !installed ? (
          <Button onClick={downloadApp}>Install MetaMask (Not implemented)</Button>
        ) : active ? (
          <Button onClick={disconnect}>Disconnect</Button>
        ) : (
          <Button onClick={connect}>Connect to MetaMask</Button>
        )}
        <DisplayMask active={active} installed={installed} account={account} />
      </header>
    </div>
  );
}

export default App;
