import React, { useContext, useEffect, useState } from 'react'
import { Container, Box, Flex } from 'theme-ui'
import pageContextProvider from '@helpers/pageContextProvider'
import { HeaderLogo } from './Header.Logo'
import { HeaderMenu } from './Header.Menu'
import { HeaderColorMode } from './Header.ColorMode'
import SearchInput from '@widgets/Search/Search.Input'

const styles = {
  wrapper: {
    position: `relative`,
    bg: `headerBg`
  },
  container: {
    position: `relative`,
    zIndex: 10
  },
  logoContainer: {
    flexBasis: [`full`, null, `220px`],
    flexShrink: 0
  },
  searchContainer: {
    flexBasis: [`auto`, null, `140px`],
    flexShrink: 1,
    minWidth: `auto`,
    order: [3, null, `unset`],
    ml: [0, null, 3],
    mr: [0, null, 4]
  },
  menuContainer: {
    flex: [`0 1 auto`, null, `1 1 auto`],
    minWidth: `auto`,
    order: [4, null, `unset`]
  },
  colorModeContainer: {
    minWidth: `auto`,
    order: [2, null, `unset`]
  }
}

export const Header = ({ children }) => {
  const context = useContext(pageContextProvider)
  const [Search, setSearch] = useState(null)

  const { services, mobileMenu, darkMode } = context.pageContext
  const algolia = services && services.algolia

  useEffect(() => {
    let mounted = true

    if (algolia) {
      import('@widgets/Search').then(module => {
        if (mounted) setSearch(() => module.default)
      })
    }

    return () => {
      mounted = false
    }
  }, [algolia])

  return (
    <Box sx={styles.wrapper}>
      <Container variant='compact' sx={styles.container}>
        <Flex variant='layout.header' sx={{ justifyContent: [`space-between`, null, `flex-start`] }}>
          <Box sx={styles.logoContainer}>
            <HeaderLogo />
          </Box>
          <Box sx={styles.searchContainer}>
            {algolia && Search ? <Search /> : <SearchInput isLoaded />}
          </Box>
          <Box sx={styles.menuContainer}>
            <HeaderMenu mobileMenu={mobileMenu} />
          </Box>
          <Box sx={styles.colorModeContainer}>
            {darkMode && <HeaderColorMode />}
          </Box>
        </Flex>
      </Container>
      {children}
    </Box>
  )
}
