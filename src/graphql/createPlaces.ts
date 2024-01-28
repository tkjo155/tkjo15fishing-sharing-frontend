import { gql } from '@apollo/client'

//GraphQLのミューテーション（変更）を定義
//createTask はミューテーションの名前.$create は変数で、型がCreateTask。この変数は新しいタスクのデータを保持するのに使われる。
export const CREATE_PLACE = gql`
  mutation createPlace($create: CreatePlace) {
    createPlace(create: $create) {
      id
      name
      prefectureId
    }
  }
  `