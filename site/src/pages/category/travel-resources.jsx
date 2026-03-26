import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Stack, Main } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import PageTitle from '@components/PageTitle'
import Seo from '@widgets/Seo'

const SUB_CATEGORIES = [
  { name: 'Travel Credit Cards', slug: 'travel-credit-cards' },
  { name: 'Travel Gear & Accessories', slug: 'travel-gear-and-accessories' },
  { name: 'Travel Insurance', slug: 'travel-insurance' },
  { name: 'Luggage & Suitcases', slug: 'luggage-and-suitcases' }
]

const TravelResourcesPage = ({ data, ...props }) => {
  const allPosts = data?.posts?.nodes ?? []

  const groups = SUB_CATEGORIES.map(cat => ({
    ...cat,
    nodes: allPosts.filter(post => post.category?.name === cat.name)
  })).filter(g => g.nodes.length > 0)

  return (
    <Layout {...props}>
      <Seo
        title='Travel Resources'
        description='Useful travel tools, planning resources, and booking-related guides in one place.'
      />
      <Divider />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PageTitle
          header='Travel Resources'
          running='Useful travel tools, planning resources, and booking-related guides in one place.'
          totalCount={allPosts.length}
        />
      </Stack>
      <Divider />
      {groups.map((group, index) => (
        <React.Fragment key={group.name}>
          <Stack
            title={group.name}
            titleLink={`/category/${group.slug}`}
          >
            <Main>
              <CardList
                nodes={group.nodes}
                limit={4}
                columns={[1, 2, 4]}
                variant={['horizontal-md', 'vertical']}
              />
            </Main>
          </Stack>
          {index < groups.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      <Divider />
    </Layout>
  )
}

export default TravelResourcesPage

export const pageQuery = graphql`
  query TravelResourcesPageQuery {
    posts: allArticle(
      filter: {
        private: { ne: true }
        draft: { ne: true }
        category: {
          name: {
            in: [
              "Travel Credit Cards"
              "Travel Gear & Accessories"
              "Travel Insurance"
              "Luggage & Suitcases"
            ]
          }
        }
      }
      sort: { date: DESC }
      limit: 100
    ) {
      nodes {
        id
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        featured
        thumbnailText
        category {
          id
          name
          slug
          color
        }
        author {
          id
          name
          slug
        }
        thumbnail {
          __typename
          ... on ImageSharp {
            ImageSharp_vertical: gatsbyImageData(
              width: 380
              height: 290
              transformOptions: { cropFocus: CENTER }
              outputPixelDensities: [0.5, 1]
              quality: 75
            )
            ImageSharp_hero: gatsbyImageData(
              width: 1600
              height: 650
              transformOptions: { cropFocus: CENTER }
              outputPixelDensities: [0.5, 1]
              quality: 75
            )
          }
        }
      }
    }
  }
`
