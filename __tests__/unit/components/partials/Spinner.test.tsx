/**
 * Test file for Spinner
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Spinner } from 'partials/Spinner'

describe('Spinner Component', () => {
	it('renders on the page', () => {
		render(<Spinner />)

		const component = screen.getByTestId('Spinner')

		expect(component).toBeInTheDocument()
	})
})
