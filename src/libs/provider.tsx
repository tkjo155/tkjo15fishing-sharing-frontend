//アプリケーション内でどのコンポーネントでも、GraphQLクエリを実行するための ApolloProvider を提供
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { createApolloClient } from './client'

type Props = {
  children: React.ReactNode
}
// {children} を使って、このコンポーネントの子要素（アプリケーション内の他のコンポーネントや要素）をレンダリング
export const WithApolloProvider = ({ children }: Props) => {
  //クライアントがサーバーと通信する準備が整う
  const client = createApolloClient()
  //取得した Apollo Client のインスタンスを ApolloProvider コンポーネントの client プロパティに渡す
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
