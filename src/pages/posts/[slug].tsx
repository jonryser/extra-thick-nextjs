import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, PreviewData } from 'next'
import Container from 'components/container'
import PostBody from 'components/post-body'
import MoreStories from 'components/more-stories'
import Header from 'components/header'
import PostHeader from 'components/post-header'
import SectionSeparator from 'components/section-separator'
import Layout from 'components/layout'
import PostTitle from 'components/post-title'
import Tags from 'components/tags'
import { getAllPostsWithSlug, getPostAndMorePosts } from 'utils/api'
import { CMS_NAME } from 'utils/constants'
import { PostEdge, Post, Preview } from 'types/index'
import { ParsedUrlQuery } from 'querystring'

interface PostProps {
	post: Post
	posts: { edges: PostEdge[] }
	preview: Preview
}

export default function Post({ post, posts, preview }: PostProps) {
	const router = useRouter()
	const morePosts = posts?.edges

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}

	return (
		<Layout preview={preview}>
			<Container>
				<Header />
				{router.isFallback ? (
					<PostTitle>{`Loading…`}</PostTitle>
				) : (
					<>
						<article>
							<Head>
								<title>{`${post.title} | Next.js Blog Example with ${CMS_NAME}`}</title>
								<meta property='og:image' content={post.featuredImage?.node.sourceUrl} />
							</Head>
							<PostHeader
								title={post.title}
								coverImage={post.featuredImage}
								date={post.date}
								author={post.author}
								categories={post.categories}
							/>
							<PostBody content={post.content} />
							<footer>{post.tags.edges.length > 0 && <Tags tags={post.tags} />}</footer>
						</article>

						<SectionSeparator />
						{morePosts.length > 0 && <MoreStories posts={morePosts} />}
					</>
				)}
			</Container>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({
	params,
	preview = false,
	previewData
}: {
	params?: ParsedUrlQuery
	preview?: Preview
	previewData?: PreviewData
}) => {
	const data = await getPostAndMorePosts({ slug: params?.slug as string, preview, previewData })

	return {
		props: {
			preview,
			post: data.post,
			posts: data.posts
		},
		revalidate: 10
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const allPosts = await getAllPostsWithSlug()

	return {
		paths: allPosts.edges.map(({ node }: { node: Post }) => `/posts/${node.slug}`) || [],
		fallback: true
	}
}
