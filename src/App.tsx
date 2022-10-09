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
import {CreateSchedule} from './components/CreateSchedule'
import {ScheduleList} from './components/ScheduleList'
import {getSceneSchedulerAddress, SceneSchedulerABI as abi} from './abi/SceneSchedulerABI'
import {Contract} from "@ethersproject/contracts";

function App() {
  const [ethBalance, setEthBalance] = useState<number | undefined>(undefined)
  const [installed, setInstalled] = useState<boolean>(false)
  const [currentDT, setCurrentDT] = useState<string>()
  const { active, account, activate, deactivate, library, chainId } = useWeb3React()
  const [contract, setContract] = useState<Contract>()
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

  
  /*useEffect(() => {
    const timer = setInterval(() => {
      const dt = new Date()
      setCurrentDT(dt.toLocaleDateString() + " " + dt.toLocaleTimeString())
    }, 1000)

    return () => {
      //clearInterval(timer)
    }
  },[])*/

  useEffect(() => {
    console.log("App.tsx > useEffect[activate]")
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
    console.log("App.tsx > useEffect[account]")
    if (active && account) {
      console.log("account: ", account)
      provider?.getBalance(account).then((result: BigNumberish) => {
        setEthBalance(Number(formatEther(result)))
      })

      /*if (library && chainId)
      {      
        const _chainId:number = chainId
        const contractAddress = getSceneSchedulerAddress(_chainId)
        console.log("App.tsx > useEffect[library, chainId]: contractAddress?.length", contractAddress?.length)
        if (contractAddress?.length == 42) {
          setContract(new Contract(contractAddress, abi, library.getSigner()))
        }
      }*/
    }
  },[account/*, library, chainId*/])

  useEffect(() => {
    console.log("App.tsx > useEffect[contract]: contract: ", contract)
  },[contract])

  useEffect(() => {
    console.log("App.tsx > useEffect[library, chainId]")
    console.log("library: ", library)
    console.log("chainId: ", chainId)
    if (library && chainId)
    {      
      const _chainId:number = chainId
      const contractAddress = getSceneSchedulerAddress(_chainId)
      console.log("App.tsx > useEffect[library, chainId]: contractAddress?.length", contractAddress?.length)
      if (contractAddress?.length == 42) {
        setContract(new Contract(contractAddress, abi, library.getSigner()))
      }
    }
    
  }, [library, chainId])

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
        <div>{currentDT}</div>
        <div className="App"><hr/></div>
        {contract ? <CreateSchedule contract={contract} /> : <></>}
        <div className="App"><hr/></div>
        {contract ? <SceneScheduleNow  contract={contract} /> : <></>}
        <div className="App"><hr/></div>
        {contract ? <ScheduleList  contract={contract} account={account}/> : <></> }        
        <div className="App"><hr/></div>
        <div>ETH: {ethBalance}</div>
        <div>chain id: {chainId}</div>
      </header>
    </div>
  );
}

export default App;