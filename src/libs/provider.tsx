import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { createApolloClient } from './client'

type Props = {
  children: React.ReactNode
}

export const WithApolloProvider = ({ children }: Props) => {
  const client = createApolloClient()
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
