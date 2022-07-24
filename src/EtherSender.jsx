import { ethers } from "ethers";
import { useState, useEffect } from "react";


//props to pass this component
// network
// signer
// userAddress
// provider

export default function EtherSender(props) {

const [isMainnet, setIsMainnet] = useState();
const [toAddressInput, setToAddressInput] = useState();
const [toAddress, setToAddress] = useState('');
const [viewToAccount, setViewToAccount] = useState(false);
const [toBalance, setToBalance] = useState('');
const [sendAmountInput, setSendAmountInput] = useState();
const [sendAmount, setSendAmount] = useState('');

const network = props.network;
const signer = props.signer;
const userAddress = props.userAddress;
const provider = props.provider;

useEffect(()=>{
    console.log(sendAmount)

})

const checkAddressHandler = () => {
    setToAddress(toAddressInput);
    setViewToAccount(true);
}

const fetchToBalance = async () =>{
    const toAddressBalance = await provider.getBalance(toAddress);
    setToBalance(ethers.utils.formatEther(toAddressBalance));
    return ;
}

const submitTransactionHandler = async () => {
//need to write the body of 1. setting toBalance and 2. actually sending a transaction with value

//setSendAmount(sendAmountInput);


//This should send ether
const txSetup = {
    from: await signer.getAddress(),
    to: toAddress,
    value: sendAmount
    }

console.log(txSetup);

const tx = await signer.sendTransaction(txSetup);

    //logging transaction result
console.log("sending transaction")
await tx.wait()
console.log(tx)
}


const renderToAccount = () => {
    
    if (viewToAccount == true){
        fetchToBalance();
        return (
            <div>
            <h3>'To Account' info:</h3>
            <p>To Account: {toAddress}</p>
            <p>Ether Balance: {toBalance}</p>
            <input placeholder="amount of Ether to send" onChange={e => setSendAmount(ethers.utils.parseEther(e.target.value))}></input>
            <button onClick={submitTransactionHandler}>Submit Transaction</button>

            </div>
        )
    }
}

const mainnetCheck = () =>{
    if (network == 'Mainnet'){
        return (
            <div ><b>THIS IS A DEVELOPMENT FUNCTION, DO NOT USE ON ETHEREUM MAINNET, OR USE AT OWN RISK</b></div>
        )
    } else{
        return (
            <div style={{border: '1px solid', display:'flex', justifyContent:'center', padding:10 }}>
                <div>
                    <h3>Eth Sender</h3>
                    <p>This function will send eth from the connected wallet to the specified receipient.</p>
                    <div>
                        <input placeholder='enter receipient address' onChange={e => setToAddressInput(e.target.value)}></input>
                        <button onClick={checkAddressHandler}>Check 'to' address balance</button>
                    </div>
                    <div>
                        {renderToAccount()}
                    </div>
                </div>



            </div>
        )
    }
}
    return (  
        <div>

        {mainnetCheck()}

        </div>
    );
}

