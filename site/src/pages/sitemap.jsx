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
          {groups.map(group => (
            <Box key={group.categoryName} sx={styles.categorySection}>
              <Heading as='h2' sx={styles.categoryTitle}>
                {group.categoryName}
              </Heading>
              <Box as='ul' sx={styles.postList}>
                {group.nodes.map(post => (
                  <Box as='li' key={post.id} sx={styles.postItem}>
                    <Link href={`/${post.slug}`} sx={styles.postLink}>
                      {post.title}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
          <Divider />
          <Box sx={{ mb: 4 }}>
            <Heading as='h2' sx={styles.categoryTitle}>Pages</Heading>
            <Box as='ul' sx={styles.postList}>
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
