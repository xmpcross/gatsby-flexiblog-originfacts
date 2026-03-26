import React from 'react'
import { Box } from 'theme-ui'
import Navigation from '@components/Navigation'
import useSiteMetadata from '@helpers-blog/useSiteMetadata'

const styles = {
  navHeader: {
    display: [`none`, `block`],
    fontFamily: `'Urbanist', sans-serif`,
    fontWeight: 700,
    fontSize: `18px`
  }
}

export const FooterMenu = () => {
  const { footerMenu } = useSiteMetadata()

  return (
    <>
      {footerMenu.map(menu => (
        <Box key={`footer-menu-${menu.title}`} sx={{ 'a, span': { fontSize: `14px` } }}>
          <Navigation
            variant={[`horizontal`, `vertical`]}
            headingProps={{ variant: 'h4', as: 'p', sx: styles.navHeader }}
            items={[menu]}
          />
        </Box>
      ))}
    </>
  )
}
