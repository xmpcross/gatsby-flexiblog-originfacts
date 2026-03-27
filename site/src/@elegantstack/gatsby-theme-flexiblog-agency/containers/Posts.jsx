import React from 'react'
import { Layout, Stack, Main, Sidebar } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import NewsletterExpanded from '@widgets/NewsletterExpanded'
import BannerHorizontal from '@widgets/BannerHorizontal'
import BannerVertical from '@widgets/BannerVertical'

const CATEGORY_ORDER = [
  'Destination Guides',
  'Car Rentals & Transportation',
  'Flight Deals & Airline Guides',
  'Hotel & Accommodation',
  'Tours & Activities',
  'Travel Resources',
  'Travel Tips'
]

const EXCLUDED_CATEGORIES = [
  'Advertising',
  'Case Studies',
  'Innovation',
  'Management',
  'Travel Insurance',
  'Travel Credit Cards',
  'Car Rentals & Transportation',
  'Luggage & Suitcases',
  'Travel Gear & Accessories',
  'Tours & Activities'
]
const SIDEBAR_LAYOUT_CATEGORIES = [
  'Car Rentals & Transportation',
  'Flight Deals & Airline Guides',
  'Travel Credit Cards',
  'Travel Gear & Accessories'
]
const FEATURED_COVER_LAYOUT_CATEGORIES = []
const FULL_WIDTH_LAYOUT_CATEGORIES = []
const WHATS_NEW_LAYOUT_CATEGORIES = ['Destination Guides', 'Tours & Activities', 'Hotel & Accommodation']
const NEWS_SPLIT_LAYOUT_CATEGORIES = []
const SIMPLE_GRID_LAYOUT_CATEGORIES = []
const DESTINATION_GUIDES_COLUMN_HEIGHT = '38rem'
const DESTINATION_GUIDES_COLUMN_GAP = '5px'
const DESTINATION_GUIDES_CONTENT_PADDING = '20px'
const DESTINATION_GUIDES_CONTENT_PADDING_TOP = '15px'
const DESTINATION_GUIDES_CONTENT_PADDING_BOTTOM = '15px'
const DESTINATION_GUIDES_CONTENT_MARGIN_TOP = '0px'
const DESTINATION_GUIDES_CONTENT_MARGIN_BOTTOM = '0px'
const DESTINATION_GUIDES_CONTENT_GAP = '5px'
const DESTINATION_GUIDES_CARD_PADDING = '4px'
const DESTINATION_GUIDES_CARD_GAP = '8px'

const Posts = ({
  data: { posts = {}, featuredPosts = {}, recentPosts = {} },
  ...props
}) => {
  const { pageContext: { services = {} } = {} } = props
  const groups = React.useMemo(
    () =>
      (posts.group ?? [])
        .filter(g => !EXCLUDED_CATEGORIES.includes(g.categoryName))
        .sort((a, b) => {
          const ai = CATEGORY_ORDER.indexOf(a.categoryName)
          const bi = CATEGORY_ORDER.indexOf(b.categoryName)
          const aOrder = ai === -1 ? 999 : ai
          const bOrder = bi === -1 ? 999 : bi
          return aOrder - bOrder
        }),
    [posts.group]
  )

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Divider />
      <Stack effectProps={{ effect: false }}>
        <Main>
          <CardList
            nodes={featuredPosts.nodes}
            limit={3}
            variant='horizontal-cover'
            slider
            autoPlay
            autoplaySpeed={5000}
            fade
            controlPosition='over'
            loading='eager'
            omitCategory
          />
          <Divider space={2} />
          <CardList
            nodes={recentPosts.nodes}
            limit={4}
            columns={[1, 2]}
            variant='horizontal-aside'
            loading='eager'
          />
        </Main>
        <Sidebar sx={{ pl: `3`, flexBasis: `1/4` }}>
          <BannerVertical />
        </Sidebar>
      </Stack>
      <Divider space={5} />
      {groups.length &&
        groups.map((group, index) => {
          if (!group?.nodes?.length) return null

          const layout = SIDEBAR_LAYOUT_CATEGORIES.includes(group.categoryName)
            ? 0
            : FEATURED_COVER_LAYOUT_CATEGORIES.includes(group.categoryName)
              ? 1
              : WHATS_NEW_LAYOUT_CATEGORIES.includes(group.categoryName)
                ? 2
                : FULL_WIDTH_LAYOUT_CATEGORIES.includes(group.categoryName)
                  ? 3
                  : NEWS_SPLIT_LAYOUT_CATEGORIES.includes(group.categoryName)
                    ? 4
                     : SIMPLE_GRID_LAYOUT_CATEGORIES.includes(group.categoryName)
                       ? 5
                  : index % 3
          const layoutA = (
            <Stack
              title={group.categoryName}
              titleLink={group.nodes[0].category.slug}
              direction={['column', 'column', 'column', 'row']}
            >
              <Sidebar
                sx={{
                  pl: 0,
                  pr: [0, null, null, 3],
                  display: [null, `flex`],
                  flexDirection: [`column`, null, null, `row`]
                }}
              >
                <CardList
                  nodes={group.nodes}
                  limit={1}
                  columns={[1]}
                  variant={['horizontal-md', 'horizontal', 'horizontal', 'vertical']}
                  omitCategory
                />
              </Sidebar>
              <Main
                sx={{
                  display: [null, `flex`],
                  flexDirection: [`column`, null, null, `row`]
                }}
              >
                <Divider space={2} />
                <CardList
                  nodes={group.nodes}
                  limit={3}
                  skip={1}
                  columns={[1, 1, 3, 1]}
                  variant={['horizontal-md', 'horizontal-md', 'horizontal-aside']}
                  mediaType='icon'
                  omitCategory
                />
                <Divider space={2} />
              </Main>
              <Sidebar
                sx={{
                  pl: [0, null, null, 3],
                  display: [null, `flex`],
                  flexDirection: [`column`, null, null, `row`]
                }}
              >
                <CardList
                  nodes={group.nodes}
                  limit={1}
                  skip={4}
                  columns={[1]}
                  variant={['horizontal-md', 'horizontal', 'horizontal', 'vertical']}
                  omitCategory
                />
              </Sidebar>
            </Stack>
          )

          const layoutB = (
            <Stack
              title={group.categoryName}
              titleLink={group.nodes[0].category.slug}
            >
              <Main>
                <CardList
                  nodes={group.nodes}
                  limit={1}
                  columns={[1]}
                  variant='horizontal-cover'
                  omitCategory
                />
                <Divider space={2} />
                <CardList
                  nodes={group.nodes}
                  limit={3}
                  skip={1}
                  columns={[1, 3]}
                  variant={['horizontal-md', 'horizontal']}
                  omitCategory
                />
              </Main>
            </Stack>
          )

          const layoutC = (
            <Stack
              title={group.categoryName}
              titleLink={group.nodes[0].category.slug}
              direction={[`column`, null, null, `row`]}
            >
              <Main
                sx={{
                  display: [`block`, null, null, `flex`],
                  height: ['auto', null, null, DESTINATION_GUIDES_COLUMN_HEIGHT],
                  '> div': {
                    width: '100%',
                    height: '100%'
                  },
                  '.blog_card': {
                    m: '0 !important',
                    p: DESTINATION_GUIDES_CARD_PADDING,
                    boxSizing: 'border-box',
                    minWidth: '0 !important',
                    maxWidth: 'none !important',
                    width: '100%',
                    height: ['auto', null, null, `calc((100% - ${DESTINATION_GUIDES_CARD_GAP}) / 2)`]
                  },
                  '.blog_card + .blog_card': {
                    mt: [3, null, null, DESTINATION_GUIDES_CARD_GAP]
                  },
                  '.blog_card > div': {
                    m: '0 !important',
                    p: '0 !important',
                    height: '100%',
                    boxShadow:
                      'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px !important',
                    bg: '#ffffff !important'
                  },
                  '.blog_card > div, .blog_card article': {
                    height: '100%'
                  },
                  '.blog_card article': {
                    m: '0 !important',
                    p: '0 !important'
                  },
                  '.blog_card article > *': {
                    m: '0 !important',
                    p: '0 !important'
                  },
                  '.blog_card article > a': {
                    width: '100% !important',
                    maxWidth: 'none !important',
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    m: '0 !important',
                    p: '0 !important',
                    boxSizing: 'border-box'
                  },
                  '.blog_card article > a::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    background:
                      'linear-gradient(0deg, rgba(45,55,72,0.78) 0%, rgba(45,55,72,0.35) 55%, rgba(45,55,72,0.12) 100%)'
                  },
                  '.blog_card article > a .gatsby-image-wrapper': {
                    width: '100% !important',
                    height: '100% !important',
                    background: 'transparent !important',
                    position: 'relative',
                    zIndex: 0
                  },
                  '.blog_card article > a .gatsby-image-wrapper img': {
                    width: '100% !important',
                    height: '100% !important',
                    objectFit: 'cover !important',
                    background: 'transparent !important'
                  },
                  '.blog_card > div:hover': {
                    boxShadow: 'none !important',
                    transform: 'none !important'
                  },
                  '.blog_card article > div:last-of-type': {
                    m: '0 !important',
                    p: `${DESTINATION_GUIDES_CONTENT_PADDING} !important`,
                    pt: `${DESTINATION_GUIDES_CONTENT_PADDING_TOP} !important`,
                    pb: `${DESTINATION_GUIDES_CONTENT_PADDING_BOTTOM} !important`,
                    mt: `${DESTINATION_GUIDES_CONTENT_MARGIN_TOP} !important`,
                    mb: `${DESTINATION_GUIDES_CONTENT_MARGIN_BOTTOM} !important`,
                    justifyContent: 'flex-start !important',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    background: 'transparent !important'
                  },
                  '.blog_card article > div:last-of-type > *': {
                    p: '0 !important',
                    m: `0 0 ${DESTINATION_GUIDES_CONTENT_GAP} 0 !important`
                  },
                  '.blog_card article > div:last-of-type > p': {
                    display: 'block !important',
                    color: '#f2f2f2 !important',
                    opacity: 0.96
                  },
                  '.blog_card article > div:last-of-type > *:last-child': {
                    m: '0 !important',
                    mt: 'auto !important'
                  }
                }}
              >
                <CardList
                  nodes={group.nodes.map(node => {
                    const source = (node.longExcerpt || node.excerpt || '').trim()
                    return {
                      ...node,
                      excerpt:
                        source.length > 50
                          ? `${source.slice(0, 50).trimEnd()}...`
                          : source
                    }
                  })}
                  variant={['vertical-cover', 'vertical-cover', 'vertical-cover', 'vertical-cover']}
                  limit={2}
                  forceExcerpt
                />
              </Main>
              <Main
                sx={{
                  display: [`block`, null, null, `flex`],
                  mt: [3, null, null, 0],
                  ml: [0, null, null, DESTINATION_GUIDES_COLUMN_GAP],
                  height: ['auto', null, null, DESTINATION_GUIDES_COLUMN_HEIGHT],
                  '> div': {
                    width: '100%',
                    height: '100%'
                  },
                  '.blog_card': {
                    m: '0 !important',
                    p: DESTINATION_GUIDES_CARD_PADDING,
                    boxSizing: 'border-box',
                    minWidth: '0 !important',
                    maxWidth: 'none !important',
                    width: '100%',
                    height: ['auto', null, null, '100%']
                  },
                  '.blog_card > div': {
                    m: '0 !important',
                    p: '0 !important',
                    height: '100%',
                    boxShadow:
                      'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px !important',
                    bg: '#ffffff !important'
                  },
                  '.blog_card article > :first-of-type': {
                    m: '0 !important'
                  },
                  '.blog_card > div, .blog_card article': {
                    height: '100%'
                  },
                  '.blog_card article': {
                    m: '0 !important',
                    p: '0 !important'
                  },
                  '.blog_card article > *': {
                    m: '0 !important',
                    p: '0 !important'
                  },
                  '.blog_card article > a': {
                    width: '100% !important',
                    maxWidth: 'none !important',
                    display: 'block',
                    m: '0 !important',
                    p: '0 !important',
                    boxSizing: 'border-box'
                  },
                  '.blog_card article > a .gatsby-image-wrapper': {
                    width: '100% !important',
                    height: '100% !important',
                    background: 'transparent !important'
                  },
                  '.blog_card article > a .gatsby-image-wrapper img': {
                    width: '100% !important',
                    height: '100% !important',
                    objectFit: 'cover !important',
                    background: 'transparent !important'
                  },
                  '.blog_card > div:hover': {
                    boxShadow: 'none !important',
                    transform: 'none !important'
                  },
                  '.blog_card article > div:last-of-type': {
                    m: '0 !important',
                    p: `${DESTINATION_GUIDES_CONTENT_PADDING} !important`,
                    pt: `${DESTINATION_GUIDES_CONTENT_PADDING_TOP} !important`,
                    pb: `${DESTINATION_GUIDES_CONTENT_PADDING_BOTTOM} !important`,
                    mt: `${DESTINATION_GUIDES_CONTENT_MARGIN_TOP} !important`,
                    mb: `${DESTINATION_GUIDES_CONTENT_MARGIN_BOTTOM} !important`
                  },
                  '.blog_card article > div:last-of-type > *': {
                    p: '0 !important',
                    m: `0 0 ${DESTINATION_GUIDES_CONTENT_GAP} 0 !important`
                  },
                  '.blog_card article > div:last-of-type > *:last-child': {
                    m: '0 !important'
                  },
                  '.blog_card article > div:last-of-type > a': {
                    fontSize: '1.5rem !important',
                    fontWeight: '700 !important'
                  }
                }}
              >
                <CardList
                  nodes={group.nodes.map((node, nodeIndex) =>
                    nodeIndex === 2
                      ? {
                          ...node,
                          excerpt: (() => {
                            const cleanText = text =>
                              (text || '')
                                .replace(/<[^>]*>/g, ' ')
                                .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
                                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                                .replace(/[`*_>#]/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim()

                            const source = cleanText(node.longExcerpt) || cleanText(node.excerpt)
                            return source.length > 200
                              ? `${source.slice(0, 200).trimEnd()}...`
                              : source
                          })()
                        }
                      : node
                  )}
                  variant={['horizontal-md', 'horizontal', 'horizontal', 'vertical']}
                  limit={1}
                  skip={2}
                />
              </Main>
              <Main
                sx={{
                  display: [`block`, null, null, `flex`],
                  mt: [3, null, null, 0],
                  ml: [0, null, null, DESTINATION_GUIDES_COLUMN_GAP],
                  height: ['auto', null, null, DESTINATION_GUIDES_COLUMN_HEIGHT],
                  '> div': {
                    width: '100%',
                    height: '100%'
                  },
                  '.blog_card': {
                    m: '0 !important',
                    p: DESTINATION_GUIDES_CARD_PADDING,
                    boxSizing: 'border-box',
                    minWidth: '0 !important',
                    maxWidth: 'none !important',
                    width: '100%',
                    height: ['auto', null, null, `calc((100% - (${DESTINATION_GUIDES_CARD_GAP} * 2)) / 3)`]
                  },
                  '.blog_card + .blog_card': {
                    mt: [3, null, null, DESTINATION_GUIDES_CARD_GAP]
                  },
                  '.blog_card > div': {
                    m: '0 !important',
                    p: '0 !important',
                    height: '100%',
                    boxShadow:
                      'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px !important',
                    bg: '#ffffff !important'
                  },
                  '.blog_card > div, .blog_card article': {
                    height: '100%'
                  },
                  '.blog_card article': {
                    m: '0 !important',
                    p: '0 !important'
                  },
                  '.blog_card article > *': {
                    m: '0 !important',
                    p: '0 !important'
                  },
                  '.blog_card article > div:last-of-type': {
                    m: '0 !important',
                    p: `${DESTINATION_GUIDES_CONTENT_PADDING} !important`,
                    pt: `${DESTINATION_GUIDES_CONTENT_PADDING_TOP} !important`,
                    pb: `${DESTINATION_GUIDES_CONTENT_PADDING_BOTTOM} !important`,
                    mt: `${DESTINATION_GUIDES_CONTENT_MARGIN_TOP} !important`,
                    mb: `${DESTINATION_GUIDES_CONTENT_MARGIN_BOTTOM} !important`
                  },
                  '.blog_card article > div:last-of-type > *': {
                    p: '0 !important',
                    m: `0 0 ${DESTINATION_GUIDES_CONTENT_GAP} 0 !important`
                  },
                  '.blog_card article > div:last-of-type > *:last-child': {
                    m: '0 !important'
                  },
                  '.blog_card article > a .gatsby-image-wrapper': {
                    background: 'transparent !important'
                  },
                  '.blog_card article > a .gatsby-image-wrapper img': {
                    background: 'transparent !important'
                  },
                  '.blog_card > div:hover': {
                    boxShadow: 'none !important',
                    transform: 'none !important'
                  }
                }}
              >
                <CardList
                  nodes={group.nodes}
                  variant={[
                    'horizontal-md',
                    'horizontal-md',
                    'horizontal',
                    'horizontal-aside'
                  ]}
                  limit={3}
                  skip={3}
                  columns={[1, 2, 1, 1]}
                  omitAuthor
                />
              </Main>
            </Stack>
          )

          const layoutD = (
            <Stack
              title={group.categoryName}
              titleLink={group.nodes[0].category.slug}
            >
              <Main>
                <CardList
                  nodes={group.nodes}
                  limit={2}
                  columns={[1, 2]}
                  variant={['horizontal-md', 'horizontal-lg']}
                  omitCategory
                />
                <Divider space={2} />
                <CardList
                  nodes={group.nodes}
                  limit={2}
                  skip={2}
                  columns={[1, 2]}
                  variant={['horizontal-md', 'horizontal-aside']}
                  omitCategory
                />
              </Main>
              <Sidebar sx={{ pl: `3`, flexBasis: `1/4` }}>
                <CardList
                  nodes={group.nodes}
                  limit={1}
                  skip={4}
                  columns={[1]}
                  variant='vertical'
                  omitCategory
                />
              </Sidebar>
            </Stack>
          )

          const layoutE = (
            <Stack
              title={group.categoryName}
              titleLink={group.nodes[0].category.slug}
            >
              <Main>
                <CardList
                  nodes={group.nodes}
                  limit={1}
                  variant={['horizontal-md', 'horizontal']}
                  omitCategory
                />
                <Divider space={2} />
                <CardList
                  nodes={group.nodes}
                  limit={2}
                  skip={2}
                  columns={[1, 2]}
                  variant={['horizontal-md', 'horizontal-aside']}
                  omitMedia
                  omitCategory
                />
                <Divider space={2} />
                <CardList
                  nodes={group.nodes}
                  limit={2}
                  skip={4}
                  columns={[1, 2]}
                  variant={['horizontal-md', 'horizontal-aside']}
                  mediaType='icon'
                  omitCategory
                />
              </Main>
              <Sidebar sx={{ pl: 3, display: [null, `flex`] }}>
                <CardList
                  nodes={group.nodes}
                  limit={1}
                  skip={1}
                  variant={['horizontal-md', 'vertical']}
                  omitCategory
                />
              </Sidebar>
            </Stack>
          )

          const layoutF = (
            <Stack
              title={group.categoryName}
              titleLink={group.nodes[0].category.slug}
            >
              <Main>
                <CardList
                  nodes={group.nodes}
                  limit={4}
                  variant='horizontal-md'
                  columns={[1, 2, 2, 2]}
                  withTitleLink
                  omitCategory
                />
              </Main>
            </Stack>
          )

          return (
            <React.Fragment key={`${group.categoryName}.list`}>
              {(group.categoryName === 'Tours & Activities' || group.categoryName === 'Hotel & Accommodation') && (
                <>
                  <Stack effectProps={{ effect: false }}>
                    <BannerHorizontal />
                  </Stack>
                  <Divider />
                </>
              )}
              {layout === 0 && layoutA}
              {layout === 1 && layoutB}
              {layout === 2 && layoutC}
              {layout === 3 && layoutD}
              {layout === 4 && layoutE}
              {layout === 5 && layoutF}
              {index !== groups.length - 1 && <Divider />}
            </React.Fragment>
          )
        })}
      <Stack>
        <Main>
          {services.mailchimp && (
            <>
              <Divider space={5} />
              <NewsletterExpanded />
            </>
          )}
        </Main>
      </Stack>
    </Layout>
  )
}

export default Posts
