import React from 'react'
import { Link } from 'gatsby'
import { Card as CardComponent, Flex, Text } from 'theme-ui'
import { Layout, Stack, Main, Sidebar } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import Sticky from '@components/Sticky'
import Seo from '@widgets/Seo'
import TableOfContentsCompact from '@widgets/TableOfContentsCompact'
import Categories from '@widgets/Categories'
import { useBlogCategories } from '@helpers-blog'
import {
  PostHead,
  PostImage,
  PostBody,
  PostComments,
  PostCommentsFacebook,
  PostCommentsGraph,
  PostTagsShare,
  PostFooter
} from '@widgets/Post'

const Post = ({ data, ...props }) => {
  if (!data || !data.post) return null

  const { post, tagCategoryPosts, tagPosts, categoryPosts, previous, next } = data

  const relatedPosts = [
    ...(tagCategoryPosts ? tagCategoryPosts.nodes : []),
    ...(tagPosts ? tagPosts.nodes : []),
    ...(categoryPosts ? categoryPosts.nodes : [])
  ]
  const { pageContext: { services = {}, siteUrl } = {} } = props
  const allCategories = useBlogCategories()
  const SUB_CATEGORIES = [
    'Car Rentals & Transportation',
    'Flight Deals & Airline Guides',
    'Hotel & Accommodation',
    'Travel Credit Cards',
    'Travel Gear & Accessories',
    'Travel Insurance',
    'Luggage & Suitcases'
  ]
  const categories = allCategories.filter(
    cat => !SUB_CATEGORIES.includes(cat.name)
  )

  return (
    <Layout {...props}>
      <Seo {...post} siteUrl={siteUrl} />
      <Divider />
      <Stack>
        <Flex sx={{ alignItems: `center`, flexWrap: `wrap`, fontSize: `14px`, color: `omegaDark`, gap: 1 }}>
          <Text as={Link} to='/' sx={{ color: `inherit`, textDecoration: `none`, '&:hover': { textDecoration: `underline` } }}>Home</Text>
          <Text sx={{ mx: 1 }}>/</Text>
          {post.category && (
            <>
              <Text as={Link} to={`/${post.category.slug}`} sx={{ color: `inherit`, textDecoration: `none`, '&:hover': { textDecoration: `underline` } }}>{post.category.name}</Text>
              <Text sx={{ mx: 1 }}>/</Text>
            </>
          )}
          <Text sx={{ color: `omega` }}>{post.title}</Text>
        </Flex>
      </Stack>
      <Divider />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PostHead {...post} />
      </Stack>
      <Divider />
      <Stack effectProps={{ fraction: 0 }}>
        <Main>
          <CardComponent variant='paper'>
            <PostImage {...post} inCard />
            <PostBody {...post} />
            <PostTagsShare {...post} location={props.location} />
            {services.disqus && <PostComments {...post} />}
            {services.graphComment && <PostCommentsGraph {...post} />}
            {services.facebookComment && (
              <PostCommentsFacebook {...post} siteUrl={siteUrl} />
            )}
            <PostFooter {...{ previous, next }} />
          </CardComponent>
        </Main>
        <Sidebar>
          <Sticky>
            <Categories categories={categories} title={null} />
            <Divider />
            {post.tableOfContents?.items && (
              <>
                <TableOfContentsCompact {...post} />
                <Divider />
              </>
            )}
            {post.category && (
              <CardList
                title='Related Posts'
                nodes={relatedPosts}
                variant='horizontal-aside'
                limit={6}
                omitMedia
                omitCategory
                distinct
                aside
              />
            )}
          </Sticky>
        </Sidebar>
      </Stack>
    </Layout>
  )
}

export default Post
