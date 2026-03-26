import React from 'react'
import { Box } from 'theme-ui'
import { FaArchive } from 'react-icons/fa'
import IconButton from '@components/IconButton'
import Section from '@components/Section'

const styles = {
  horizontal: {
    display: `flex`,
    flexWrap: `nowrap`,
    overflowX: `auto`,
    scrollbarWidth: `none`,
    msOverflowStyle: `none`,
    width: `auto`,
    scrollBehavior: `smooth`,
    m: -2,
    '::-webkit-scrollbar': {
      display: `none`
    },
    a: {
      flex: 1,
      minWidth: [`1/3`, `auto`],
      m: 2
    }
  }
}

const Categories = ({ variant, categories, ...props }) => {
  const sliderRef = React.useRef(null)

  React.useEffect(() => {
    if (variant !== 'horizontal') return undefined

    const slider = sliderRef.current
    if (!slider) return undefined

    let isPaused = false
    const step = 1
    const intervalMs = 30

    const tick = () => {
      if (isPaused) return

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth
      if (maxScrollLeft <= 0) return

      if (slider.scrollLeft >= maxScrollLeft) {
        slider.scrollTo({ left: 0, behavior: 'auto' })
        return
      }

      slider.scrollTo({ left: slider.scrollLeft + step, behavior: 'auto' })
    }

    const pause = () => {
      isPaused = true
    }

    const resume = () => {
      isPaused = false
    }

    const intervalId = window.setInterval(tick, intervalMs)

    slider.addEventListener('mouseenter', pause)
    slider.addEventListener('mouseleave', resume)
    slider.addEventListener('focusin', pause)
    slider.addEventListener('focusout', resume)
    slider.addEventListener('touchstart', pause, { passive: true })
    slider.addEventListener('touchend', resume)

    return () => {
      window.clearInterval(intervalId)
      slider.removeEventListener('mouseenter', pause)
      slider.removeEventListener('mouseleave', resume)
      slider.removeEventListener('focusin', pause)
      slider.removeEventListener('focusout', resume)
      slider.removeEventListener('touchstart', pause)
      slider.removeEventListener('touchend', resume)
    }
  }, [categories, variant])

  return (
    <Section aside={variant === 'vertical'} title='Topics' {...props}>
      <Box ref={sliderRef} sx={styles[variant]}>
        {categories &&
          categories.map(({ id, name, slug, totalCount, icon }) => {
            const buttonProps = {
              key: id,
              name,
              number: totalCount,
              to: slug,
              iconPath: icon,
              Icon: !icon && FaArchive,
              variant
            }

            return totalCount !== 0 && <IconButton {...buttonProps} />
          })}
      </Box>
    </Section>
  )
}

export default Categories

Categories.defaultProps = {
  variant: 'vertical'
}
