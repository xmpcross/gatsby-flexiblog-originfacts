import React from 'react'
import { Layout, Stack, Main, Sidebar } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import Categories from '@widgets/Categories'
import NewsletterExpanded from '@widgets/NewsletterExpanded'
import BannerHorizontal from '@widgets/BannerHorizontal'
import BannerVertical from '@widgets/BannerVertical'
import { useBlogCategories } from '@helpers-blog'

const EXCLUDED_CATEGORIES = [
  'Advertising',
  'Case Studies',
  'Innovation',
  'Management',
  'Travel Insurance',
  'Travel Credit Cards'
]
const SIDEBAR_LAYOUT_CATEGORIES = [
  'Hotel & Accommodation',
  'Car Rentals & Transportation',
  'Travel Credit Cards',
  'Travel Gear & Accessories'
]
const FEATURED_COVER_LAYOUT_CATEGORIES = ['Flight Deals & Airline Guides']
const FULL_WIDTH_LAYOUT_CATEGORIES = []
const WHATS_NEW_LAYOUT_CATEGORIES = ['Destination Guides', 'Tours & Activities']
const NEWS_SPLIT_LAYOUT_CATEGORIES = []
const SIMPLE_GRID_LAYOUT_CATEGORIES = []

const Posts = ({
  data: { posts = {}, featuredPosts = {}, recentPosts = {} },
  ...props
}) => {
  const { pageContext: { services = {} } = {} } = props
  const categories = useBlogCategories()

  const groups = React.useMemo(
    () => (posts.group ?? []).filter(g => !EXCLUDED_CATEGORIES.includes(g.categoryName)),
    [posts.group]
  )

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Divider />
      <Stack effectProps={{ effect: false }}>
        <Categories categories={categories} variant='horizontal' omitTitle />
      </Stack>
      <Divider />
      <Stack effectProps={{ effect: false }}>
        <Main>
          <CardList
            nodes={featuredPosts.nodes}
            limit={3}
            variant='horizontal-cover'
            slider
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
                  display: [`block`, null, null, `flex`]
                }}
              >
                <CardList
                  nodes={group.nodes}
                  variant={['vertical-cover']}
                  limit={2}
                  omitCategory
                />
              </Main>
              <Divider space={2} />
              <Main
                sx={{
                  mx: [0, null, null, 3],
                  display: [`block`, null, null, `flex`]
                }}
              >
                <CardList
                  nodes={group.nodes}
                  variant={['horizontal-md', 'horizontal', 'horizontal', 'vertical']}
                  limit={1}
                  skip={2}
                  omitCategory
                />
              </Main>
              <Divider space={2} />
              <Main>
                <CardList
                  nodes={group.nodes}
                  variant={[
                    'horizontal-md',
                    'horizontal-md',
                    'horizontal',
                    'horizontal-aside'
                  ]}
                  limit={2}
                  skip={3}
                  columns={[1, 2, 1, 1]}
                  omitCategory
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
              {index === 0 && (
                <>
                  <Divider />
                  <Stack effectProps={{ effect: false }}>
                    <BannerHorizontal />
                  </Stack>
                </>
              )}
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
