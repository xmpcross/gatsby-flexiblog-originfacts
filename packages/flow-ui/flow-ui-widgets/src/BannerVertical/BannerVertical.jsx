import React from 'react'
import { Link } from 'gatsby'
import { Flex, Button, Heading, Text } from 'theme-ui'
import { FaRegHandshake } from 'react-icons/fa'

const styles = {
  wrapper: {
    alignItems: `stretch`,
    flexDirection: `column`,
    bg: `omegaLighter`,
    borderRadius: `lg`,
    size: `full`,
    p: 4,
  },
  embed: {
    width: `100%`
  },
  heading: {
    color: `omegaDark`,
    width: `100%`,
    textAlign: `left`,
    svg: {
      color: `beta`,
      size: `icon.lg`,
      display: `block`,
      mb: 3,
    },
  },
  subheading: {
    color: `omegaDark`,
    fontWeight: `normal`,
  },
  list: {
    color: `omegaDark`,
    listStyle: `none`,
    m: 0,
    p: 0,
    li: {
      p: 0,
      my: 2,
    },
    a: {
      color: `inherit`,
      textDecoration: `none`,
      ':hover': {
        textDecoration: `underline`
      }
    },
    'li:before': {
      content: `""`,
      display: `inline-block`,
      width: `icon.xs`,
      bg: `success`,
      borderRadius: `full`,
      size: `7px`,
      mr: `7px`,
    },
  },
  button: {
    display: `block`,
    mt: `auto`,
  }
}

const BannerVertical = () => (
  <Flex sx={styles.wrapper}>
    <Heading variant='h2' sx={styles.heading}>
      <FaRegHandshake />
      Explore the World, Without the Price Tag.
    </Heading>
    <Heading variant='h4' sx={styles.subheading}>
      Expert destination guides, insider secrets for cheap flights, and hand-picked stays. Your journey to the extraordinary starts here.
    </Heading>
    <Text as='ul' variant='small' sx={styles.list}>
      <li>
        <Link to='/category/destination-guides'>
          <b>Destination Guides:</b> Plan your next itinerary with local insights.
        </Link>
      </li>
      <li>
        <Link to='/category/flight-deals-and-airline-guides'>
          <b>Cheap Flights:</b> Master the art of the "Error Fare" and budget booking.
        </Link>
      </li>
      <li>
        <Link to='/category/hotel-and-accommodation'>
          <b>Stays & Hotels:</b> From boutique gems to budget-friendly hostels.
        </Link>
      </li>
      <li>
        <Link to='/category/car-rentals-and-transportation'>
          <b>Car Rentals:</b> Road trip essentials and rental hacks.
        </Link>
      </li>
      <li>
        <Link to='/category/travel-resources'>
          <b>Travel Resources:</b> The gear, apps, and insurance we actually use.
        </Link>
      </li>

    </Text>
    <Button
      variant='primary'
      as={Link}
      to='/'
      sx={styles.button}
      aria-label='Learn More'
    >
      Learn More
    </Button>
  </Flex>
)

export default BannerVertical
