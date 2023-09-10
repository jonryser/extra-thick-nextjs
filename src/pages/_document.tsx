import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

/**
 *  _document is only rendered on the server side and not on the client side
 * Event handlers like onClick can't be added to this file.
 */

export default class CustomDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang={`en`}>
				<Head>
					<link
						href={`https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=optional`}
						rel={`stylesheet`}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
