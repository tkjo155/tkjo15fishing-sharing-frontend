import '@/styles/globals.css'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'

import { WithApolloProvider } from '../libs/provider'

const client = new ApolloClient({
  //バックエンドURLを指定
  uri: 'http://localhost:4000',
  //cacheは のインスタンスでありInMemoryCache、Apollo クライアントがクエリ結果をフェッチした後にキャッシュするために使用
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WithApolloProvider>
      <Component {...pageProps} />
    </WithApolloProvider>
  )
}

export { client }
