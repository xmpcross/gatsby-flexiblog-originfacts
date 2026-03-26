import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Layout, Stack, Main } from '@layout'
import PageTitle from '@components/PageTitle'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import { Box, Heading, Text } from 'theme-ui'

const styles = {
  section: {
    mb: 5
  },
  categoryHeading: {
    mb: 3,
    pb: 2,
    borderBottomWidth: `sm`,
    borderBottomStyle: `solid`,
    borderBottomColor: `omegaLight`
  },
  postList: {
    listStyle: `none`,
    p: 0,
    m: 0
  },
  postItem: {
    py: 1
  },
  link: {
    color: `alpha`,
    textDecoration: `none`,
    fontSize: 1,
    '&:hover': {
      textDecoration: `underline`
    }
  },
  staticLink: {
    color: `alpha`,
    textDecoration: `none`,
    '&:hover': {
      textDecoration: `underline`
    }
  },
  staticList: {
    listStyle: `none`,
    p: 0,
    m: 0,
    display: `grid`,
    gridTemplateColumns: [`1fr`, `1fr 1fr`, `1fr 1fr 1fr`],
    gap: 2
  }
}

const staticPages = [
  { name: 'Home', slug: '/' },
  { name: 'About Us', slug: '/about-us' },
  { name: 'Contact Us', slug: '/contact' },
  { name: 'Privacy Policy', slug: '/privacy-policy' },
  { name: 'Cookie Policy', slug: '/cookie-policy' },
  { name: 'Terms of Use', slug: '/terms-conditions' }
]

const PageSitemap = props => {
  const data = useStaticQuery(graphql`
    query SitemapQuery {
      allArticle(
        filter: { draft: { ne: true } }
        sort: [{ date: DESC }]
      ) {
        nodes {
          title
          slug
          category {
            name
            slug
          }
        }
      }
    }
  `)

  const articles = data.allArticle.nodes

  // Group articles by category
  const grouped = articles.reduce((acc, article) => {
    if (!article.category) return acc
    const catName = article.category.name
    if (!acc[catName]) {
      acc[catName] = {
        slug: article.category.slug,
        posts: []
      }
    }
    acc[catName].posts.push(article)
    return acc
  }, {})

  return (
    <Layout {...props}>
      <Seo title='Sitemap' />
      <Divider />
      <Stack>
        <Main>
          <PageTitle
            header='Sitemap'
            subheader='A complete index of all pages and posts on this site.'
          />
          <Divider />

          {/* Static Pages */}
          <Box sx={styles.section}>
            <Heading as='h2' variant='h3' sx={styles.categoryHeading}>
              Pages
            </Heading>
            <Box as='ul' sx={styles.staticList}>
              {staticPages.map(page => (
                <Box as='li' key={page.slug}>
                  <Text
                    as={Link}
                    to={page.slug}
                    sx={styles.staticLink}
                  >
                    {page.name}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Posts grouped by category */}
          {Object.entries(grouped).map(([categoryName, { slug, posts }]) => (
            <Box key={categoryName} sx={styles.section}>
              <Heading as='h2' variant='h3' sx={styles.categoryHeading}>
                <Text as={Link} to={slug} sx={{ color: `heading`, textDecoration: `none` }}>
                  {categoryName}
                </Text>
              </Heading>
              <Box as='ul' sx={styles.postList}>
                {posts.map(post => (
                  <Box as='li' key={post.slug} sx={styles.postItem}>
                    <Text as={Link} to={post.slug} sx={styles.link}>
                      {post.title}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Main>
      </Stack>
    </Layout>
  )
}

export default PageSitemap
