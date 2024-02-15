import { render, screen } from '@testing-library/react'
import PlacesList from './PlacesList'
import { GET_PLACES } from '@/graphql'

// Mock data for GET_PLACES query
const mockPlacesQuery = {
  request: {
    query: GET_PLACES,
  },
  result: {
    data: {
      places: [
        { id: '1', name: 'Place 1', prefecture: 'Tokyo' },
        { id: '2', name: 'Place 2', prefecture: 'Osaka' },
        // Add more places as needed
      ],
    },
  },
}

describe('PlacesList', () => {
  it('renders PlacesList component with mock data', () => {
    render(
      <MockedProvider mocks={[mockPlacesQuery]} addTypename={false}>
        <PlacesList data={{ places: [] }} />
      </MockedProvider>,
    )

    // Verify that the places are rendered on the screen
    expect(screen.getByText('Place 1')).toBeInTheDocument()
    expect(screen.getByText('Place 2')).toBeInTheDocument()
    // Add more assertions as needed
  })
})
