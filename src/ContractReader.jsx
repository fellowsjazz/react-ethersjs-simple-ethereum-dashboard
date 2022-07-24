import { ethers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";

//props to pass component:
// signerOrProvider
// userAddress
//

export default function ContractReader(props){

    const [contractAddress, setContractAddress] = useState('0x6B175474E89094C44Da98b954EedeAC495271d0F'); //set contract address to read here (default Ropsten DAI)
    const [contractName, setContractName] = useState();
    const [totalSupply, setTotalSupply] = useState();
    const [infoFetched, setInfoFetched] = useState(false);
    const [addressInput, setAddressInput] = useState();
    const [userBalance, setUserBalance] = useState();

    const ERC20_ABI = [
        "function name() view returns (string)", 
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint256)"
    ];
    
    const signerOrProvider = props.signerOrProvider;
    
    const currentContract = new ethers.Contract(contractAddress, ERC20_ABI, signerOrProvider)

    const userAddress = props.userAddress;

    useEffect(()=>{
        fetchInfo();
        
    },[])

    useEffect(()=>{
    console.log("contract name is: ", contractName);
    console.log("contract totalSupply is: ", totalSupply);

    },[infoFetched])

    useEffect(()=>{
        console.log("new contract address ", contractAddress);
        fetchInfo();
    },[contractAddress]);
    
    const fetchInfo = async () => {
        const newContractName = await currentContract.name();
        setContractName(newContractName);
        const newTotalSupply = await currentContract.totalSupply();
        setTotalSupply(newTotalSupply);
        const newUserBalance = await currentContract.balanceOf(userAddress);
        setUserBalance(newUserBalance);
        setInfoFetched(true);
        
    }

    const renderInfo = () => {
        if(infoFetched){
            return (
                <div>
                <p><b>Token Name: </b>{contractName}</p>
                <p><b>Total Supply: </b>{ethers.utils.formatEther(totalSupply)}</p>
                <p><b>Your Balance: </b>{ethers.utils.formatEther(userBalance)}</p>
                </div>
            )
        }
    }


    const handleSubmit = () =>{
        setContractAddress(addressInput);
    }


return (  
    <div style={{marginTop:10}}> 
    <div> {"Enter ERC20 contract address:  "}
    <input 
    defaultValue={contractAddress}
    onChange={e => setAddressInput(e.target.value)}></input>
    <button onClick={handleSubmit}>Submit</button>

    </div>
    <div>{renderInfo()}</div>
    
    </div>
        );

};