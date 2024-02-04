import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
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
