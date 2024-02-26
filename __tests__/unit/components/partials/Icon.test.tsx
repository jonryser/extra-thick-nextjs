/**
 * Test file for Icon
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Icon } from 'partials'
import { siFacebook } from 'simple-icons'

describe('Icon Component', () => {
	it('renders on the page', () => {
		render(<Icon icon={siFacebook} />)

		const component = screen.getByTestId('Icon')

		expect(component).toBeInTheDocument()
	})
})
