//HTTP 経由で指定されたサーバーのエンドポイントに GraphQL リクエストを行うための基本的な Apollo クライアント設定をセットアップ

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

//指定されたキャッシュとリンク構成を持つ新しいインスタンスを返す関数
export const createApolloClient = () =>
  new ApolloClient({
    //空のメモリ内キャッシュを初期化
    cache: new InMemoryCache({}),
    //GraphQL サーバーの URI とリクエストの追加ヘッダーを使用して HTTP リンクを設定
    link: new HttpLink({
      uri: 'http://localhost:4000',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }),
  })
