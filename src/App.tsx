import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import { Web3 } from 'web3'
//import { Contract } from "web3-eth-contract"
import { SceneScheduleABI } from "./SceneSchedule"

type SchedulesProps = {
  ethAddress: string;
}

const Schedules: React.FC<SchedulesProps> = ({ethAddress}) => {
  //const web3 = new Web3(Web3.)
  
  const contract: Contract = new web3.eth.Contract()
  return (<div></div>)
}


const App: React.FC = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [ethAddress, setEthereumAccount] = useState<string | null>(null);

  useEffect(() => {
    if((window as any).ethereum) {
      // check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
  }, [] // empty brackets means: call only once when the page is loaded
  );

  // Does the User have an Ethereum wallet/account?
  async function connectMetamaskWallet(): Promise<void> {
    // to get around type checking
    (window as any).ethereum
    .request({
      method: "eth_requestAccounts",
    })
    .then((accounts : string[]) => {
      setEthereumAccount(accounts[0]);
      
    })
    .catch((error: any) => {
      alert('Something went wrong: ${error}');
    });
  }

  if (ethAddress === null) {
    return (
      <div className="App App-header">
        {
          isMetamaskInstalled ? (
            <div>
              <img src={logo} alt="logo" />
              <button onClick={connectMetamaskWallet}>Connect Your Metamask Wallet</button>
            </div>
          ) : (
            <p>Install Your Metamask wallet</p>
          )
        }
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo"/> */}
        <p>ETH wallet connected as: {ethAddress}</p>
      </header>
      <Schedules ethAddress={ethAddress}></Schedules>
    </div>    
  )
}


export default App;
