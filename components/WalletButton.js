import Head from 'next/head'
import React, { useEffect } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import Link from 'next/link'
import useSWR from 'swr'
import { formatEther }from '@ethersproject/units'
import { Button, Label } from 'semantic-ui-react'


export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    56, // bsc mainnet
    97  // bsc testnet
  ],
})

export const ConnectButton = () => {
  const { chainId, account, activate, active } = useWeb3React();

  const onClick = () => {
    activate(injectedConnector)
  }

  return (
    <>
        <Button as='a' inverted onClick={onClick} style={{marginTop:'10px'}}>连接钱包</Button>
    </>
  )
}

const fetcher = (library) => (...args) => {
  const [method, ...params] = args
  console.log(method, params)
  return library[method](...params)
}

const Balance = () => {
  const { chainId, account, library, activate } = useWeb3React()
  if(!library){
    return <>...</>
  }

  const onClick = () => {
    activate(injectedConnector)
  }

  if(chainId != 56 && chainId != 97){
    return (
        <>
            <Button as='a' inverted onClick={onClick} style={{marginTop:'10px'}}>Not BSC, Again!</Button>
        </>
      )
  }

  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library),
  })

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`)
    library.on('block', () => {
      console.log('update balance...')
      mutate(undefined, true)
    })
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners('block')
    }
    // trigger the effect only on component mount
  }, [])

  if (!balance) {
    return <>...</>
  }
  const bal = parseFloat(formatEther(balance)).toPrecision(4)
  const acc = account.substring(0, 5) + '...' + account.substring(account.length - 4)
  return (
            <div style={{marginTop:'10px'}}>
                <Label style={{marginRight:'1px'}} size='large'><font color='orange'>{bal}</font>BNB</Label>
                <Label style={{marginLeft:'1px'}} size='large'>{acc}</Label>
            </div>
        )
}


export default function WalletButton() {
    const { account, library, activate, active } = useWeb3React()
    if(active){
        return <Balance/>
    }else{
        return <ConnectButton/>
    }
}
