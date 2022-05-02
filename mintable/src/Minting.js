import { useState } from "react";
import {ethers, BigNumber} from 'ethers'
import Mintable from './Mintable.json';

const MintableAddress = "0xCcfD0F4A13b2b1c296D5cbad82B8e046081aA1BA";

const Minting = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                MintableAddress,   
                Mintable.abi,
                signer
            );
            try{
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response', response);
            } catch (err) {
                console.log('error', err)
            }
        } 
    }

    const handleDecrement = () => {
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };
    const handleIncrement = () => {
        if(mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div>
            <h1> Mint Bird</h1>
            <p> 
                mint any bird or tree 
            </p>
            {isConnected ? (
                <div>
                <div>
                    <button onClick={handleDecrement}> - </button>
                    <input type='number' value={mintAmount}/>
                    <button onClick={handleIncrement}> + </button>
                </div>
                <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be Connected to Mint</p>
            )}
        </div>
    );
};

export default Minting;