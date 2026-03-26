import React from 'react'
import { Layout, Stack, Main, Sidebar } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import Categories from '@widgets/Categories'
import NewsletterExpanded from '@widgets/NewsletterExpanded'
import BannerVertical from '@widgets/BannerVertical'
import { useBlogCategories } from '@helpers-blog'

const Posts = ({
  data: { posts = {}, featuredPosts = {}, recentPosts = {} },
  ...props
}) => {
  const { pageContext: { services = {} } = {} } = props
  const categories = useBlogCategories()

  const EXCLUDED_CATEGORIES = [
    'Advertising',
    'Case Studies',
    'Innovation',
    'Management',
    'Travel Insurance'
  ]
  const SIDEBAR_LAYOUT_CATEGORIES = [
    'Hotel & Accommodation',
    'Car Rentals & Transportation'
  ]
  const FEATURED_COVER_LAYOUT_CATEGORIES = ['Flight Deals & Airline Guides']
  const FULL_WIDTH_LAYOUT_CATEGORIES = [
    'Destination Guides',
    'Tours & Activities'
  ]

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
              : FULL_WIDTH_LAYOUT_CATEGORIES.includes(group.categoryName)
                ? 2
              : index % 3

          // Layout 0: sidebar + main + sidebar (5 cards)
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

          // Layout 1: hero cover + horizontal grid (4 cards)
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

          // Layout 2: full-width horizontal-lg grid (4 cards)
          const layoutC = (
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

          return (
            <React.Fragment key={`${group.categoryName}.list`}>
              {layout === 0 && layoutA}
              {layout === 1 && layoutB}
              {layout === 2 && layoutC}
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
