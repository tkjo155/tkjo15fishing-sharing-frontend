import { GET_PLACES } from '@/graphql/getPlaces'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const createApolloClient = () =>
  new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  })

export async function getStaticProps() {
  const client = createApolloClient()

  const { data } = await client.query({
    query: GET_PLACES,
  })
  return {
    props: {
      data,
    },
  }
}
