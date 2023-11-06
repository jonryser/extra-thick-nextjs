/**
 * Test file for Icon
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { siFacebook } from 'simple-icons'
import { Icon } from 'partials'

describe('Icon Component', () => {
	it('renders on the page', () => {
		render(<Icon icon={siFacebook} />)

		const component = screen.getByTestId('Icon')

		expect(component).toBeInTheDocument()
	})
})
