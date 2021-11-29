import React from 'react'
import { AppProps } from 'next/app'

import '../styles/generic.css'

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://human-engine.herokuapp.com/',
  cache: new InMemoryCache(),
  credentials: 'include',
})

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
