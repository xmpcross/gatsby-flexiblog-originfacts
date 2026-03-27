import React, { useState, useMemo } from 'react'
import { Link } from 'gatsby'
import { Box, Badge, Flex, Text } from 'theme-ui'
import { Layout, Stack, Main, PreFooter } from '@layout'
import PageTitle from '@components/PageTitle'
import Pagination from '@components/Pagination'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'

const styles = {
  filterPanel: {
    width: [`full`, null, `260px`],
    flexShrink: 0,
    pr: [0, null, 5],
    mb: [4, null, 0]
  },
  filterPanelInner: {
    position: [`static`, null, `sticky`],
    top: 4
  },
  filterGroup: {
    mb: 4
  },
  // Filter section headers (All Topics, Tags)
  filterLabel: {
    fontSize: `1.2rem`,
    fontWeight: `bold`,
    color: `omegaDark`,
    mb: 2,
    display: `block`
  },
  // Top-level category row (link + optional toggle)
  categoryRow: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    mb: 1
  },
  // Category link badge
  categoryBadge: {
    cursor: `pointer`,
    textDecoration: `none`,
    userSelect: `none`,
    fontSize: `1rem`
  },
  // Expand/collapse toggle button
  toggleBtn: {
    background: `none`,
    border: `none`,
    cursor: `pointer`,
    color: `omegaDark`,
    fontSize: `0.75rem`,
    p: 1,
    lineHeight: 1,
    flexShrink: 0
  },
  // Orphan group header (non-linked parent name)
  groupHeader: {
    fontSize: `1rem`,
    fontWeight: `bold`,
    color: `omegaDark`,
    mb: 1,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    cursor: `pointer`,
    userSelect: `none`
  },
  // Sub-category container
  subList: {
    pl: 3,
    mt: 1,
    mb: 2,
    display: `flex`,
    flexDirection: `column`,
    gap: 1
  },
  // Sub-category link
  subBadge: {
    cursor: `pointer`,
    textDecoration: `none`,
    userSelect: `none`,
    fontSize: `1rem`,
    display: `inline-block`
  },
  // Tags badges row
  filterBadges: {
    display: `flex`,
    flexWrap: `wrap`,
    gap: 2
  },
  tagBadge: {
    cursor: `pointer`,
    textDecoration: `none`,
    userSelect: `none`,
    fontSize: `1rem`
  },
  postsColumn: {
    flex: 1,
    minWidth: 0
  },
  // Category page description
  description: {
    fontSize: `18px`,
    color: `omegaDark`,
    mb: 3
  }
}

const PageCollection = ({
  data: { posts, collectionInfo, allCategories },
  ...props
}) => {
  const [activeTag, setActiveTag] = useState(null)
  const categories = allCategories?.nodes || []

  // Build grouped category structure
  const { topLevelCategories, childrenByParent, orphanGroups } = useMemo(() => {
    const childMap = new Map()
    const topLevel = []
    const topLevelNameSet = new Set()

    categories.forEach(cat => {
      if (!cat.parentCategory) {
        topLevel.push(cat)
        topLevelNameSet.add(cat.name)
      } else {
        if (!childMap.has(cat.parentCategory)) childMap.set(cat.parentCategory, [])
        childMap.get(cat.parentCategory).push(cat)
      }
    })

    // Groups whose parent name isn't itself a top-level category
    const orphans = []
    childMap.forEach((children, parentName) => {
      if (!topLevelNameSet.has(parentName)) orphans.push({ parentName, children })
    })

    return { topLevelCategories: topLevel, childrenByParent: childMap, orphanGroups: orphans }
  }, [categories])

  // Auto-expand the group that contains the current category
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = new Set()
    if (collectionInfo.parentCategory) initial.add(collectionInfo.parentCategory)
    return initial
  })

  const toggleGroup = name => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  // Unique tags from current posts
  const allTags = useMemo(() => {
    const tagMap = new Map()
    posts.nodes.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          if (!tagMap.has(tag.id)) tagMap.set(tag.id, tag)
        })
      }
    })
    return Array.from(tagMap.values())
  }, [posts.nodes])

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts.nodes
    return posts.nodes.filter(
      post => post.tags && post.tags.some(tag => tag.id === activeTag)
    )
  }, [posts.nodes, activeTag])

  return (
    <Layout {...props}>
      <Seo
        title={collectionInfo.name}
        description={collectionInfo.description}
      />
      <Divider />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PageTitle
          header={collectionInfo.name}
          subheader={collectionInfo.title}
          running={collectionInfo.description}
          totalCount={posts.totalCount}
          headingStyle={{ fontSize: '2rem', fontWeight: 700 }}
          runningSx={styles.description}
        />
      </Stack>
      <Divider />
      <Stack>
        <Main sx={{ maxWidth: `container`, width: `full` }}>
          <Flex sx={{ flexDirection: [`column`, null, `row`], alignItems: `flex-start` }}>

            {/* Left column — Filters */}
            <Box sx={styles.filterPanel}>
              <Box sx={styles.filterPanelInner}>

                {/* All Topics */}
                {categories.length > 0 && (
                  <Box sx={styles.filterGroup}>
                    <Text sx={styles.filterLabel}>All Topics</Text>

                    {/* Top-level categories */}
                    {topLevelCategories.map(cat => {
                      const children = childrenByParent.get(cat.name) || []
                      const isExpanded = expandedGroups.has(cat.name)
                      const isActive = collectionInfo.slug === cat.slug

                      return (
                        <Box key={cat.id}>
                          <Box sx={styles.categoryRow}>
                            <Badge
                              variant={isActive ? 'tag' : 'tag-white'}
                              as={Link}
                              to={`/${cat.slug}`}
                              sx={styles.categoryBadge}
                            >
                              {cat.name}
                            </Badge>
                            {children.length > 0 && (
                              <Box
                                as='button'
                                sx={styles.toggleBtn}
                                onClick={() => toggleGroup(cat.name)}
                                aria-expanded={isExpanded}
                              >
                                {isExpanded ? '▾' : '▸'}
                              </Box>
                            )}
                          </Box>

                          {/* Sub-categories dropdown */}
                          {children.length > 0 && isExpanded && (
                            <Box sx={styles.subList}>
                              {children.map(child => (
                                <Badge
                                  key={child.id}
                                  variant={collectionInfo.slug === child.slug ? 'tag' : 'tag-white'}
                                  as={Link}
                                  to={`/${child.slug}`}
                                  sx={styles.subBadge}
                                >
                                  {child.name}
                                </Badge>
                              ))}
                            </Box>
                          )}
                        </Box>
                      )
                    })}

                    {/* Orphan groups (parent not a top-level category) */}
                    {orphanGroups.map(({ parentName, children }) => {
                      const isExpanded = expandedGroups.has(parentName)
                      return (
                        <Box key={parentName}>
                          <Box
                            sx={styles.groupHeader}
                            onClick={() => toggleGroup(parentName)}
                          >
                            <Text>{parentName}</Text>
                            <Text sx={{ fontSize: `0.75rem` }}>
                              {isExpanded ? '▾' : '▸'}
                            </Text>
                          </Box>
                          {isExpanded && (
                            <Box sx={styles.subList}>
                              {children.map(child => (
                                <Badge
                                  key={child.id}
                                  variant={collectionInfo.slug === child.slug ? 'tag' : 'tag-white'}
                                  as={Link}
                                  to={`/${child.slug}`}
                                  sx={styles.subBadge}
                                >
                                  {child.name}
                                </Badge>
                              ))}
                            </Box>
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                )}

                {/* Tags */}
                {allTags.length > 0 && (
                  <Box sx={styles.filterGroup}>
                    <Text sx={styles.filterLabel}>Tags</Text>
                    <Box sx={styles.filterBadges}>
                      <Badge
                        variant={!activeTag ? 'tag' : 'tag-white'}
                        onClick={() => setActiveTag(null)}
                        sx={styles.tagBadge}
                      >
                        All
                      </Badge>
                      {allTags.map(tag => (
                        <Badge
                          key={tag.id}
                          variant={activeTag === tag.id ? 'tag' : 'tag-white'}
                          onClick={() =>
                            setActiveTag(activeTag === tag.id ? null : tag.id)
                          }
                          sx={styles.tagBadge}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </Box>
                  </Box>
                )}

              </Box>
            </Box>

            {/* Right column — Posts */}
            <Box sx={styles.postsColumn}>
              {filteredPosts && (
                <CardList
                  nodes={filteredPosts}
                  variant={['horizontal-md', 'vertical']}
                  columns={[1, 2, 3]}
                  omitCategory={
                    props.pageContext &&
                    props.pageContext.collectionType === 'category'
                  }
                />
              )}
            </Box>

          </Flex>
        </Main>
      </Stack>
      <Divider />
      <PreFooter>
        <Pagination {...posts.pageInfo} {...collectionInfo} />
      </PreFooter>
    </Layout>
  )
}

export default PageCollection
