import React from 'react'
import { Main, Layout, Stack } from '@layout'
import Divider from '@components/Divider'
import PageTitle from '@components/PageTitle'
import Seo from '@widgets/Seo'
import { Box, Heading, Link } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

const styles = {
  categorySection: {
    mb: 5
  },
  categoryTitle: {
    fontFamily: 'Urbanist',
    fontWeight: 700,
    fontSize: '1.25rem',
    mb: 3,
    pb: 2,
    borderBottom: '2px solid',
    borderColor: 'omegaLighter'
  },
  subCategoryTitle: {
    fontFamily: 'Urbanist',
    fontWeight: 600,
    fontSize: '1rem',
    mb: 2,
    mt: 3,
    color: 'omegaDark'
  },
  postList: {
    listStyle: 'none',
    m: 0,
    p: 0,
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
    gap: 2
  },
  postItem: {
    m: 0,
    p: 0
  },
  postLink: {
    fontSize: '0.9rem',
    color: 'text',
    textDecoration: 'none',
    lineHeight: 1.4,
    '&:hover': {
      color: 'alpha',
      textDecoration: 'underline'
    }
  }
}

const PageSitemap = props => {
  const data = useStaticQuery(graphql`
    query SitemapQuery {
      allArticle(
        filter: { draft: { ne: true } }
        sort: { date: DESC }
      ) {
        group(field: { category: { name: SELECT } }) {
          categoryName: fieldValue
          nodes {
            id
            title
            slug
          }
        }
      }
    }
  `)

  const groups = data.allArticle.group

  // Known parent-child category relationships from categories JSON
  const parentMap = {
    'Car Rentals & Transportation': 'Travel Tips',
    'Flight Deals & Airline Guides': 'Travel Tips',
    'Hotel & Accommodation': 'Travel Tips',
    'Luggage & Suitcases': 'Travel Resources',
    'Travel Credit Cards': 'Travel Resources',
    'Travel Gear & Accessories': 'Travel Resources',
    'Travel Insurance': 'Travel Resources',
  }

  // Group articles by their parent category (or directly if no parent)
  const topLevel = {}
  groups.forEach(group => {
    const parent = parentMap[group.categoryName]
    if (parent) {
      if (!topLevel[parent]) topLevel[parent] = { direct: [], subCategories: {} }
      topLevel[parent].subCategories[group.categoryName] = group.nodes
    } else {
      if (!topLevel[group.categoryName]) topLevel[group.categoryName] = { direct: group.nodes, subCategories: {} }
      else topLevel[group.categoryName].direct = group.nodes
    }
  })

  return (
    <Layout {...props}>
      <Seo title='Sitemap' />
      <Divider />
      <Stack>
        <Main>
          <PageTitle
            header='Sitemap'
            subheader='A complete list of all articles and pages on OriginFacts.'
          />
          <Divider />
          <Box sx={styles.categorySection}>
            <Heading as='h2' sx={styles.categoryTitle}>Categories</Heading>
            {Object.entries(topLevel).map(([mainCat, { direct, subCategories }]) => (
              <Box key={mainCat} sx={{ mb: 5 }}>
                <Heading as='h3' sx={styles.subCategoryTitle}>{mainCat}</Heading>
                {direct && direct.length > 0 && (
                  <Box as='ul' sx={{ ...styles.postList, gridTemplateColumns: ['1fr', '1fr 1fr'] }}>
                    {direct.map(post => (
                      <Box as='li' key={post.id} sx={styles.postItem}>
                        <Link href={post.slug} sx={styles.postLink}>{post.title}</Link>
                      </Box>
                    ))}
                  </Box>
                )}
                {Object.entries(subCategories).map(([subCat, posts]) => (
                  <Box key={subCat} sx={{ mt: 3 }}>
                    <Heading as='h4' sx={{ ...styles.subCategoryTitle, fontSize: '0.9rem', color: 'alpha', mb: 2 }}>
                      {subCat}
                    </Heading>
                    <Box as='ul' sx={{ ...styles.postList, gridTemplateColumns: subCat === 'Car Rentals & Transportation' ? '1fr' : ['1fr', '1fr 1fr'] }}>
                      {posts.map(post => (
                        <Box as='li' key={post.id} sx={styles.postItem}>
                          <Link href={post.slug} sx={styles.postLink}>{post.title}</Link>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Divider />
          <Box sx={{ mb: 4 }}>
            <Heading as='h2' sx={styles.categoryTitle}>Pages</Heading>
            <Box as='ul' sx={{ ...styles.postList, gridTemplateColumns: '1fr' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about-us' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Cookie Policy', path: '/cookie-policy' },
                { label: 'Terms & Conditions', path: '/terms-conditions' }
              ].map(({ label, path }) => (
                <Box as='li' key={path} sx={styles.postItem}>
                  <Link href={path} sx={styles.postLink}>{label}</Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Main>
      </Stack>
    </Layout>
  )
}

export default PageSitemap
