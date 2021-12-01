import React from 'react'
import { AppProps } from 'next/app'

import '../styles/generic.css'

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_APOLLO_GQL_CLIENT}`,
    cache: new InMemoryCache(),
    credentials: 'include',
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
