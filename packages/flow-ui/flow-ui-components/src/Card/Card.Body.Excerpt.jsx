import React from 'react'
import { Text, useThemeUI, get } from 'theme-ui'
import rv from '@components/utils/buildResponsiveVariant'

const styles = {
  excerpt: {
    flex: `auto`,
    mb: 3,
    fontSize: `1rem`
  }
}

const CardBodyExcerpt = ({ variant, excerpt, omitExcerpt, forceExcerpt }) => {
  const context = useThemeUI()

  const responsiveVariant = rv(variant, 'excerpt')

  const visibility = responsiveVariant.reduce(
    (mobileVisibility, variant) =>
      mobileVisibility === false &&
      get(context.theme, variant, {}).display === 'none'
        ? false
        : true,
    false
  )

  return !omitExcerpt && (forceExcerpt || visibility) ? (
    <Text
      variant='small'
      sx={{
        ...styles.excerpt,
        ...(forceExcerpt
          ? {
              display: `block`,
              color: `#ffffff`
            }
          : {
              variant: responsiveVariant
            })
      }}
    >
      {excerpt}
    </Text>
  ) : null
}

export default CardBodyExcerpt
