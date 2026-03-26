import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Box, Flex, NavLink, IconButton, Heading, Divider } from 'theme-ui'
import hashCode from '@components/utils/hashCode'
import buildResponsiveVariant from '@components/utils/buildResponsiveVariant'

const styles = {
  divider: {
    mt: 3
  },
  dropdownWrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    minWidth: '220px',
    bg: 'background',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    borderRadius: 'default',
    border: '1px solid',
    borderColor: 'omegaLight',
    py: 2,
    zIndex: 999
  },
  dropdownItem: {
    px: 3,
    py: 1,
    '& a': {
      display: 'block',
      whiteSpace: 'nowrap'
    }
  },
  verticalSubList: {
    pl: 3,
    borderLeft: '2px solid',
    borderColor: 'omegaLight',
    ml: 2,
    mb: 1
  }
}

const NavigationList = ({ navKey, wrapperProps, items, ...props }) =>
  items ? (
    <Flex {...wrapperProps}>
      {items.map((menuItem, index) => (
        <NavigationItem key={`${navKey}-${index}`} {...menuItem} {...props} />
      ))}
    </Flex>
  ) : null

const NavigationDivider = ({ index }) =>
  index !== 0 && <Divider sx={styles.divider} />

const NavigationDropdown = ({ name, slug, url, Icon, color, variant, items }) => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      sx={styles.dropdownWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        as={slug ? Link : url ? 'a' : 'span'}
        to={slug || undefined}
        href={url || undefined}
        sx={{ variant }}
      >
        {Icon && <Icon color={color} />}
        {name} ▾
      </NavLink>
      {open && (
        <Box sx={styles.dropdownMenu}>
          {items.map((item, i) => (
            <Box key={i} sx={styles.dropdownItem}>
              <NavigationItem
                {...item}
                variant={buildResponsiveVariant('links', 'vertical')}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

const NavigationItem = ({
  name,
  slug,
  url,
  Icon,
  color,
  variant,
  iconOnly,
  items
}) => {
  const isVertical = typeof variant === 'string' && variant.includes('vertical')

  // Item has sub-items — render with dropdown (desktop) or indented list (mobile/vertical)
  if (items && items.length) {
    if (isVertical) {
      return (
        <Box>
          <NavLink
            as={slug ? Link : url ? 'a' : 'span'}
            to={slug || undefined}
            href={url || undefined}
            sx={{ variant }}
          >
            {Icon && <Icon color={color} />}
            {name}
          </NavLink>
          <Box sx={styles.verticalSubList}>
            {items.map((item, i) => (
              <NavigationItem key={i} {...item} variant={variant} />
            ))}
          </Box>
        </Box>
      )
    }

    // Desktop horizontal dropdown
    return <NavigationDropdown name={name} slug={slug} url={url} Icon={Icon} color={color} variant={variant} items={items} />
  }

  let linkProps = {
    sx: { variant: iconOnly ? 'icon' : variant }
  }

  //External link
  if (url) {
    linkProps = {
      ...linkProps,
      as: 'a',
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  //Internal link
  if (slug) {
    linkProps = {
      ...linkProps,
      as: Link,
      to: slug
    }
  }

  return iconOnly ? (
    <IconButton {...linkProps} title={name}>
      {Icon && <Icon color={color} />}
    </IconButton>
  ) : (
    <NavLink {...linkProps}>
      {Icon && <Icon color={color} />}
      {name}
    </NavLink>
  )
}

const Navigation = ({
  items,
  variant,
  headingProps,
  wrapperStyle,
  ...props
}) => {
  if (!items || !items.length) return null

  const wrapperVariant = buildResponsiveVariant('lists.links', variant)
  const linkVariant = buildResponsiveVariant('links', variant)

  const navKey = `${hashCode(
    items.map(node => node.title || node.name).join()
  )}-nav`

  const wrapperProps = {
    sx: { variant: wrapperVariant, ...wrapperStyle },
    key: navKey
  }

  const hasGroupedItems = Array.isArray(items[0].items) && items[0].title

  return hasGroupedItems ? (
    items.map((node, i) => (
      <Fragment key={`nav-menu-${i}`}>
        <NavigationDivider index={i} />
        <Heading {...headingProps}>{node.title}</Heading>
        <NavigationList
          navKey={navKey}
          wrapperProps={wrapperProps}
          items={node.items}
          variant={linkVariant}
          {...props}
        />
      </Fragment>
    ))
  ) : (
    <NavigationList
      navKey={navKey}
      wrapperProps={wrapperProps}
      items={items}
      variant={linkVariant}
      {...props}
    />
  )
}

export default Navigation

Navigation.defaultProps = {
  variant: 'horizontal'
}

const itemsShape = PropTypes.shape({
  name: PropTypes.string,
  slug: PropTypes.string,
  color: PropTypes.string,
  Icon: PropTypes.element
})

const variantShape = PropTypes.oneOf(['horizontal', 'vertical'])

Navigation.propTypes = {
  variant: PropTypes.oneOfType([PropTypes.arrayOf(variantShape), variantShape]),
  iconOnly: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  headingProps: PropTypes.object,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        items: itemsShape
      })
    ),
    PropTypes.arrayOf(itemsShape)
  ])
}
