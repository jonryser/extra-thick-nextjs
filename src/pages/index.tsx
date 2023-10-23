import { Head } from 'components/partials'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from 'utils/api'
import { PAGE_TITLE } from 'utils/constants'
import { PostEdge, Preview } from 'types/index'

export default function Index({
	allPosts: { edges },
	preview
}: {
	allPosts: { edges: PostEdge[] }
	preview: Preview
}) {
	const heroPost = edges[0]?.node
	const morePosts = edges.slice(1)

	return (
		<Layout preview={preview}>
			<Head data={{ title: PAGE_TITLE }} />
			<Container>
				<Intro />
				{heroPost && (
					<HeroPost
						title={heroPost.title}
						coverImage={heroPost.featuredImage}
						date={heroPost.date}
						author={heroPost.author}
						slug={heroPost.slug}
						excerpt={heroPost.excerpt}
					/>
				)}
				{morePosts.length > 0 && <MoreStories posts={morePosts} />}
			</Container>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const allPosts = await getAllPostsForHome(preview)

	return {
		props: { allPosts, preview },
		revalidate: 10
	}
}
