import { Heading,Text } from '@chakra-ui/react'
import React from 'react'
import {
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react'

function Info() {
  return (
    <components style={{ 
      marginLeft: '30%',
      marginRight: '30%',
      height: '90vh', // Full height of the viewport
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      background: 'rgba(19, 24, 35, 1)',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 18px )',
      borderRadius: '10px',
      border: '1px solid rgba( 255, 255, 255, 0.18 )'
    }}
      >
    <div style={{ 
    display: 'block',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh' // Adjust as needed
      }}>
        <div>
      <Heading color='#AAABC1' as='h2' size='xl' style={{ borderBottom: '2px solid #1C1C20' }}>
      Claim<span style={{ backgroundColor: '#2ef2b1' }}> Your XZO</span>
      </Heading>
        </div>
<div style={{margin:'20px',maxWidth:'50%'}}>
<Text color='#AAABC1' fontSize='lg'>
           The wait is finally over! Now you can claim your tokens on Ethereum Mainnet. Which you can later bridge to EXZO Network!
          </Text>
          <br />
          <Text fontSize='md' fontWeight='600' color='#2ef2b1' backgroundColor='black' maxWidth='fit-content' padding='3px'>Eligibility Criteria & Requirements</Text>
          <UnorderedList>
  <ListItem color='#AAABC1'>You must own WXZO on BSC Chain</ListItem>
  <ListItem color='#AAABC1'>If you want to claim your funds you must click on Claim button and pay gas fees, then XZO tokens will be immediately sent to your wallet </ListItem>
  <ListItem color='#AAABC1'>Make sure you are logged into same account in which you have tokens on different network</ListItem>
</UnorderedList>
          <br />
          <Text fontSize='md' fontWeight='600' color='#2ef2b1' backgroundColor='black' maxWidth='fit-content' padding='3px'>Usage</Text>
          <UnorderedList>
  <ListItem color='#AAABC1'>If Ethereum mainnet is not added to your Metamask, click on the buttom at bottom left.</ListItem>
  <ListItem color='#AAABC1'>After adding the Ethereum Mainnet, click on top right button to Connect Wallet, make sure you connect the wallet in which you have tokens on BSC network.</ListItem>
  <ListItem color='#AAABC1'>Click on claim buttton and pay gas fees and tokens will be immediately sent to your wallet!</ListItem>
</UnorderedList>
</div>
    </div>
    </components>
  )
}

export default Info
