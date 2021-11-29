import React from 'react'
import { AppProps } from 'next/app'

import '../styles/generic.css'

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
