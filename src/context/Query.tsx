import type Children from '../types/Children'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()

export const QueryProvider = ({ children }: Children) => {

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  ) 
}

export default client