import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import "./App.css"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Info from './components/Info';
import { Heading,Text } from '@chakra-ui/react';
import { useToast ,Button,Box} from "@chakra-ui/react";
import claimableAirdrop from "./contract/ClaimableAirdrop.json"
import claims from "./contract/claims.json"

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [hash,setHash] = useState("")
  const [claimsCount,setClaimsCount] = useState(0)
  const [buttonText,setButtonText] = useState("Claim")
  const toast = useToast();

  const overrides = {
    gasLimit: 9999999,
  }

  // useEffect(() => {
  //   const fetchClaimsAndFunds = async() => {
  //     const contractInstance = new ethers.Contract(claimableAirdrop.address,claimableAirdrop.abi,signer)
  //     try {
  //       const res = await contractInstance.getClaimsCount();
  //      setClaimsCount(parseInt(res._hex,16))
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if(signer){
  //     fetchClaimsAndFunds();
  //   }
  //   const intervalId = setInterval(fetchClaimsAndFunds, 10000);
  //   return () => clearInterval(intervalId);
  // }, [signer]); 

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
        const currentSigner = provider.getSigner();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId === '0xAA36A7'.toLowerCase()) { 
        console.log("connected")
        setSelectedAccount(accounts[0]);
        setIsConnected(true);
        setSigner(currentSigner);
        console.log('Connected to wallet', accounts[0]);
        console.log('Signer:', currentSigner);

        // Add event listener for account changes
        window.ethereum.on('accountsChanged', (newAccounts) => {
          let provider_ = new ethers.providers.Web3Provider(window.ethereum);
          setSelectedAccount(newAccounts[0]);
          setSigner(provider_.getSigner());
        });
      } else {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xAA36A7' }], 
        });
      }
    } catch (error) {
      console.error(error);
      alert("unrecognized network")
    }
  };

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xAA36A7',
          chainName: 'Sepolia',
          nativeCurrency: {
            name: 'Sepolia',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['https://rpc.sepolia.org'],
          blockExplorerUrls: ['https://evm-testnet.Exzoscan.io/'], 
        }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const claim = async()=>{
    if(signer){
      const claimData = claims.res.claims[ethers.utils.getAddress(selectedAccount)]
      console.log(claimData)
      const contractInstance = new ethers.Contract(claimableAirdrop.address,claimableAirdrop.abi,signer)
      try {
        const res = await contractInstance.claim(claimData.index,ethers.utils.getAddress(selectedAccount),ethers.BigNumber.from(claimData.amount),claimData.proof,overrides);
        setButtonText("Processing Transaction...")
        console.log(await res.wait())
        toast({
          title: "Tokens have been successfully claimed!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setButtonText("Claimed")
      } catch (error) {
        console.log(error);
        if(!claimData){
          toast({
            title: "You don't own any XZO Tokens!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        toast({
          title: "Encountered an error, if you already claimed please don't waste your time here!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }



  return (
    <div className='app-container'>
      <Navbar func={isConnected? ()=>{}: connectWallet} text={isConnected?`${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`:"Connect Wallet"}/>
      {signer?(
        <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Heading as='h2' size='xl' style={{ borderBottom: '2px solid #ccc' }}>
          
        Exzo Network <span style={{ backgroundColor: '#2ef2b1' }}>Airdrop</span>
      </Heading>
      <div style={{margin:'20px',maxWidth:'50%'}}>
      <Text fontSize='lg'>
           TBR:  You need to pay a small gas fees to claim them!
          </Text>
          </div>
        
          <Box>
      <Text
        fontSize="sm"
        color="green.500"
        background={'grey.800'}
        fontWeight="bold"
        animation="blinkingText 3s infinite"
        _hover={{ animation: 'none' }} 

        css={{
          '@keyframes blinkingText': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      >
        Stats: {claimsCount} people have claimed their funds till now!
      </Text>
    </Box>
          <br />
          <br />
          <Button 
            colorScheme="blue" 
            onClick={claim}
            className="connect-button"
            width={260}
          >
           {buttonText}
          </Button>

          {hash.length>0?"Tx Successful at "+hash:""}
        </div>
      ):<Info/>}

      <Footer isConnected={isConnected} addNetwork={addNetwork} />
    </div>
  );
}

export default App;
