import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { DisplayMask } from "./DisplayMask";
import { Button } from "./Button";
import { formatEther } from "@ethersproject/units"
import { BigNumberish } from '@ethersproject/bignumber';
import { SceneScheduleNow } from "./components/SceneScheduleNow"

function App() {
  const [ethBalance, setEthBalance] = useState<number | undefined>(undefined)
  const [installed, setInstalled] = useState<boolean>(false);
  const { active, account, activate, deactivate, library, chainId } = useWeb3React();
  const provider = library

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

  useEffect(() => {
    if (active && account) {
      provider?.getBalance(account).then((result: BigNumberish) => {
        setEthBalance(Number(formatEther(result)))
      })
    }
  })

  const downloadApp = () =>
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related?hl=en"
    );
  
  return (
    <div className="App">
      <header className="App-header">                
      { !installed ? (
          <Button onClick={downloadApp}>Install MetaMask (Not implemented)</Button>
        ) : active ? (
          <Button onClick={disconnect}>Disconnect</Button>
        ) : (
          <Button onClick={connect}>Connect to MetaMask</Button>
        )}        
        <DisplayMask active={active} installed={installed} account={account} />        
        <SceneScheduleNow library={library} chainId={chainId} />        
        <br/>
        <div>ETH: {ethBalance}</div>
        <div>chain id: {chainId}</div>
      </header>
    </div>
  );
}

export default App;
