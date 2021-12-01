import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'

import { QueryProvider } from './context/Query'
import { SocketProvider } from './context/Socket'
import { UserProvider } from './context/User'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryProvider>
    <SocketProvider>
    <UserProvider>
      
      <App />

    </UserProvider>
    </SocketProvider>
    </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)