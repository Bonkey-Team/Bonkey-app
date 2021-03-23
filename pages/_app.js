// import App from 'next/app'
import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Layout from '../components/Layout'

// const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK1')

function getLibrary(provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}
  

function App({ Component, pageProps }) {
    console.log("app start... ")
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
        </Web3ReactProvider>
    )
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default App