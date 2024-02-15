import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import PlaceForm from '...../index'
import { CREATE_PLACE, GET_PLACES, GET_PREFECTURES } from '@/graphql' 
import React from 'react'

// Mock data for GET_PREFECTURES query
const mockPrefecturesQuery = {
  request: {
    query: GET_PREFECTURES,
  },
  result: {
    data: {
      prefectures: [
        { id: 1, name: 'Tokyo' },
        // Add more prefectures as needed
      ],
    },
  },
}

// Mock data for CREATE_PLACE mutation
const mockCreatePlaceMutation = {
  request: {
    query: CREATE_PLACE,
    variables: {
      create: {
        name: 'Test Place',
        prefectureId: 1,
      },
    },
  },
  result: {
    data: {
      createPlace: {
        id: '1',
        name: 'Test Place',
        prefectureId: 1,
      },
    },
  },
}

describe('PlaceForm', () => {
  it('renders PlaceForm component and submits form', async () => {
    render(
      <MockedProvider mocks={[mockPrefecturesQuery, mockCreatePlaceMutation]} addTypename={false}>
        <PlaceForm data={{ prefectures: [] }} />
      </MockedProvider>,
    )

    // Simulate user input
    fireEvent.change(screen.getByLabelText('港名'), { target: { value: 'Test Place' } })

    // Submit form
    fireEvent.click(screen.getByText('完了'))

    // Wait for the mutation and refetchQueries to complete
    await waitFor(() => {
      // Verify that the mutation was called
      expect(mockCreatePlaceMutation.request).toHaveBeenCalled()

      // You may also add additional checks based on your application logic
    })
  })
})
