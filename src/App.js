
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';


const App = () => {

const [loginState, setLoginState] = useState(false);
const [provider, setProvider] = useState();
const [currentAccount, setCurrentAccount] = useState();
const [signer, setSigner] = useState();
const [buttonText, setButtonText] = useState('Log In With Ethereum');
const [balance, setBalance] = useState();
const [transactionCount, setTransactionCount] = useState();
const [network, setNetwork] = useState();
const [blockNumber, setBlockNumber] = useState();

useEffect(() => {
  if(loginState){
    setButtonText('Logged in (click to refresh)');
  } 
},[loginState])

useEffect(() => {
  if(provider != undefined){
  setSigner(provider.getSigner());
  }
}, [provider])



const requestProvider = () => {
  const newProvider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(newProvider);
}

const requestAccounts = async () => {
  const newAccounts = await window.ethereum.request({ method: "eth_requestAccounts"});
  setCurrentAccount(newAccounts[0]);
}


const loginHandler = () => {
  setLoginState(true);
  requestProvider();
  requestAccounts();
  fetchBalance();
  fetchTransactionCount()
  fetchNetwork();
  fetchBlockNumber();
  
}

async function fetchBalance() {
  if  (typeof window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('Got provider:', provider);
    const newAccounts = await window.ethereum.request({ method: "eth_requestAccounts"});
    console.log('request accounts', newAccounts);
    const bigBalance = await provider.getBalance(newAccounts[0]);
    const ethBalance = ethers.utils.formatEther(bigBalance);
    console.log(ethBalance);
    setBalance(ethBalance);
    return ethBalance;
  }
}

async function fetchTransactionCount(){
  if(typeof window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newAccounts = await window.ethereum.request({ method: "eth_requestAccounts"});
    const newCount = await provider.getTransactionCount(newAccounts[0]);
    console.log(newCount);
    setTransactionCount(newCount);
  }
}

async function fetchNetwork(){
  if(typeof window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newNetwork = await provider.getNetwork();
    console.log(newNetwork.name);
    
    if(newNetwork.name == 'homestead'){
      setNetwork('Mainnet');
    } else {
      setNetwork(newNetwork.name);
    }
  }
}

async function fetchBlockNumber(){
  if(typeof window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newBlockNumber = await provider.getBlockNumber();
    console.log(newBlockNumber);
    setBlockNumber(newBlockNumber);
  }
}

const stateLogHandler = () => {
  console.log('loginState is ',{loginState});
  console.log('provider is ',{provider});
  console.log('currentAccount is ',{currentAccount});
  console.log('signer is ',{signer});
  
}


const loggedIn = () => {
  if (loginState) {
    return (
    <div>

    <div style={{margin:10}}><b>Account: </b> {currentAccount} </div>

    <div style={{margin:10}}><b>Current Network: </b> {network}</div>

    <div style={{margin:10}}><b>Block Number: </b> {blockNumber}</div>
    
    <div style={{margin:10}}><b>Ether Balance: </b> {balance}</div>

    <div style={{margin:10}}><b>Transactions Sent: </b> {transactionCount} </div>

    </div>
    );


  } else {
    return <p>You are not yet connected. Please connect and your details will render!</p>
  }
}








  return (
    <div>
    <h1>A Simple Ethereum Dashboard</h1>
    <div style={{display:'flex', justifyContent:'center'}}>
    <button onClick={loginHandler}>{buttonText}</button>
    </div>

    <div>{loggedIn()}</div>

    <div style={{display:'flex', justifyContent:'center'}}>
      <button onClick={stateLogHandler}>Console Log State</button>
    </div>
    
    </div>
    
     
   
  );
  }

export default App;

