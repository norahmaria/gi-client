import type Children from '../types/Children'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const client = new QueryClient()

export const QueryProvider = ({ children }: Children) => {

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  ) 
}

export default client