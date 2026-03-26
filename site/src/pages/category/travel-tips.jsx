import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Stack, Main } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import PageTitle from '@components/PageTitle'
import Seo from '@widgets/Seo'

const SUB_CATEGORIES = [
  { name: 'Car Rentals & Transportation', slug: 'car-rentals-and-transportation' },
  { name: 'Flight Deals & Airline Guides', slug: 'flight-deals-and-airline-guides' },
  { name: 'Hotel & Accommodation', slug: 'hotel-and-accommodation' }
]

const TravelTipsPage = ({ data, ...props }) => {
  const allPosts = data?.posts?.nodes ?? []

  const groups = SUB_CATEGORIES.map(cat => ({
    ...cat,
    nodes: allPosts.filter(post => post.category?.name === cat.name)
  })).filter(g => g.nodes.length > 0)

  return (
    <Layout {...props}>
      <Seo
        title='Travel Tips'
        description='Flight, hotel, and transportation advice grouped in one place for easier trip planning.'
      />
      <Divider />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PageTitle
          header='Travel Tips'
          running='Flight, hotel, and transportation advice grouped in one place for easier trip planning.'
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

export default TravelTipsPage

export const pageQuery = graphql`
  query TravelTipsPageQuery {
    posts: allArticle(
      filter: {
        private: { ne: true }
        draft: { ne: true }
        category: {
          name: {
            in: [
              "Car Rentals & Transportation"
              "Flight Deals & Airline Guides"
              "Hotel & Accommodation"
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
