import React, { useState } from 'react'
import { Main, Layout, Stack } from '@layout'
import Divider from '@components/Divider'
import PageTitle from '@components/PageTitle'
import Seo from '@widgets/Seo'
import { Box, Heading, Text, Button, Input, Label, Select, Flex } from 'theme-ui'

const styles = {
  searchBox: {
    bg: 'white',
    borderRadius: 'lg',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    p: [4, 5],
    mb: 6
  },
  searchGrid: {
    display: 'grid',
    gridTemplateColumns: ['1fr', null, '1fr 1fr', '1fr 1fr 1fr 1fr'],
    gap: 3,
    mb: 3
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'omegaDark',
    mb: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  input: {
    borderRadius: 'default',
    borderColor: 'omegaLight',
    fontSize: '1rem',
    p: 2,
    '&:focus': {
      borderColor: 'alpha',
      outline: 'none'
    }
  },
  searchButton: {
    width: '100%',
    py: 3,
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: 'default',
    cursor: 'pointer',
    mt: [0, null, null, 4]
  },
  tripTypeRow: {
    display: 'flex',
    gap: 3,
    mb: 4
  },
  tripTypeBtn: active => ({
    px: 4,
    py: 2,
    borderRadius: 'full',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: '2px solid',
    borderColor: active ? 'alpha' : 'omegaLight',
    bg: active ? 'alpha' : 'white',
    color: active ? 'white' : 'omegaDark',
    transition: 'all 0.15s ease'
  }),
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: ['1fr', null, '1fr 1fr 1fr'],
    gap: 4,
    mb: 6
  },
  tipCard: {
    p: 4,
    bg: 'omegaLighter',
    borderRadius: 'lg',
    borderTop: '3px solid',
    borderColor: 'alpha'
  },
  tipIcon: {
    fontSize: '2rem',
    mb: 2,
    display: 'block'
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: ['1fr 1fr', null, 'repeat(4, 1fr)'],
    gap: 3,
    mb: 6
  },
  siteCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 4,
    bg: 'white',
    borderRadius: 'lg',
    border: '1px solid',
    borderColor: 'omegaLight',
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.15s ease',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
    }
  },
  siteIcon: {
    fontSize: '2rem',
    mb: 2
  },
  siteName: {
    fontWeight: 700,
    color: 'heading',
    fontSize: '0.95rem',
    mb: 1
  },
  siteDesc: {
    color: 'omegaDark',
    fontSize: '0.8rem'
  }
}

const SEARCH_SITES = [
  {
    name: 'Google Flights',
    icon: '✈️',
    desc: 'Best price calendar & alerts',
    url: (from, to) => {
      const base = 'https://www.google.com/travel/flights'
      if (!from && !to) return base
      const params = new URLSearchParams()
      if (from) params.set('q', `flights from ${from} to ${to || 'anywhere'}`)
      return `${base}?${params.toString()}`
    }
  },
  {
    name: 'Skyscanner',
    icon: '🌏',
    desc: 'Compare hundreds of airlines',
    url: () => 'https://www.skyscanner.com.au'
  },
  {
    name: 'Kayak',
    icon: '🔍',
    desc: 'Flexible date search',
    url: () => 'https://www.kayak.com.au/flights'
  },
  {
    name: 'Webjet',
    icon: '🇦🇺',
    desc: 'Domestic & international deals',
    url: () => 'https://www.webjet.com.au/flights'
  }
]

const TIPS = [
  {
    icon: '📅',
    title: 'Book 6–8 Weeks Ahead',
    body: 'For domestic flights, the sweet spot is 4–6 weeks before departure. International flights are cheapest when booked 2–3 months out.'
  },
  {
    icon: '🗓️',
    title: 'Fly on Tuesdays & Wednesdays',
    body: 'Mid-week flights are consistently cheaper than weekend departures. Avoid Monday and Friday for the best fares.'
  },
  {
    icon: '🔔',
    title: 'Set Fare Alerts',
    body: 'Use Google Flights or Skyscanner price alerts to get notified when your route drops in price — then book fast.'
  },
  {
    icon: '🌐',
    title: 'Use Incognito Mode',
    body: "Flight prices can increase based on your search history. Always search in a private/incognito window to see the most accurate prices."
  },
  {
    icon: '🔄',
    title: 'Try Nearby Airports',
    body: 'Flying into or out of a nearby airport can save hundreds. Compare all airports within 2 hours of your destination.'
  },
  {
    icon: '💳',
    title: 'Use Points & Miles',
    body: "Credit card reward points and frequent flyer miles can cover flights entirely. Check your airline's partner network for more options."
  }
]

const FlightSearchPage = props => {
  const [tripType, setTripType] = useState('return')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departure, setDeparture] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('1')

  const handleSearch = e => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (from) params.set('q', `flights from ${from} to ${to || 'anywhere'}`)
    if (departure) params.set('dates', departure + (returnDate ? `,${returnDate}` : ''))
    const url = `https://www.google.com/travel/flights${params.toString() ? '?' + params.toString() : ''}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Layout {...props}>
      <Seo title='Flight Search — Find Cheap Flights'>
            <script async type='module' src='https://tpscr.com/wl_web/main.js?wl_id=15561' data-noptimize='1' data-cfasync='false' data-wpfc-render='false' data-no-defer='1' />
          </Seo>
      <Divider />
      <Stack>
        <Main>
          <PageTitle
            header='Flight Search'
            subheader='Find the cheapest flights to anywhere in the world. Compare prices across hundreds of airlines and booking sites.'
          />
          <Divider />

          {/* Travelpayouts Widget */}
          <div id='tpwl-search'></div>
          <div id='tpwl-tickets'></div>

          {/* Search Box */}
          <Box sx={styles.searchBox} as='form' onSubmit={handleSearch}>
            {/* Trip Type Toggle */}
            <Flex sx={styles.tripTypeRow}>
              {['return', 'one-way', 'multi-city'].map(type => (
                <Box
                  key={type}
                  as='button'
                  type='button'
                  sx={styles.tripTypeBtn(tripType === type)}
                  onClick={() => setTripType(type)}
                >
                  {type === 'return' ? 'Return' : type === 'one-way' ? 'One Way' : 'Multi-City'}
                </Box>
              ))}
            </Flex>

            <Box sx={styles.searchGrid}>
              {/* From */}
              <Box sx={styles.fieldGroup}>
                <Label sx={styles.label} htmlFor='from'>From</Label>
                <Input
                  id='from'
                  sx={styles.input}
                  placeholder='City or airport'
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                />
              </Box>

              {/* To */}
              <Box sx={styles.fieldGroup}>
                <Label sx={styles.label} htmlFor='to'>To</Label>
                <Input
                  id='to'
                  sx={styles.input}
                  placeholder='City or airport'
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
              </Box>

              {/* Dates */}
              <Box sx={styles.fieldGroup}>
                <Label sx={styles.label} htmlFor='departure'>
                  {tripType === 'one-way' ? 'Departure Date' : 'Departure → Return'}
                </Label>
                <Flex sx={{ gap: 2 }}>
                  <Input
                    id='departure'
                    sx={{ ...styles.input, flex: 1 }}
                    type='date'
                    value={departure}
                    onChange={e => setDeparture(e.target.value)}
                  />
                  {tripType === 'return' && (
                    <Input
                      sx={{ ...styles.input, flex: 1 }}
                      type='date'
                      value={returnDate}
                      onChange={e => setReturnDate(e.target.value)}
                    />
                  )}
                </Flex>
              </Box>

              {/* Passengers + Search */}
              <Box sx={styles.fieldGroup}>
                <Label sx={styles.label} htmlFor='passengers'>Passengers</Label>
                <Select
                  id='passengers'
                  sx={styles.input}
                  value={passengers}
                  onChange={e => setPassengers(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'passenger' : 'passengers'}</option>
                  ))}
                </Select>
              </Box>
            </Box>

            <Button type='submit' sx={styles.searchButton} variant='primary'>
              Search Flights
            </Button>
          </Box>

          {/* Search Sites */}
          <Heading as='h2' variant='h2' sx={{ mb: 4 }}>
            Popular Flight Search Sites
          </Heading>
          <Box sx={styles.linksGrid}>
            {SEARCH_SITES.map(site => (
              <Box
                key={site.name}
                as='a'
                href={site.url(from, to, departure, returnDate, tripType)}
                target='_blank'
                rel='noopener noreferrer'
                sx={styles.siteCard}
              >
                <Text sx={styles.siteIcon}>{site.icon}</Text>
                <Text sx={styles.siteName}>{site.name}</Text>
                <Text sx={styles.siteDesc}>{site.desc}</Text>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Tips */}
          <Heading as='h2' variant='h2' sx={{ mb: 4 }}>
            Tips for Finding Cheap Flights
          </Heading>
          <Box sx={styles.tipsGrid}>
            {TIPS.map(tip => (
              <Box key={tip.title} sx={styles.tipCard}>
                <Text as='span' sx={styles.tipIcon}>{tip.icon}</Text>
                <Heading as='h3' variant='h4' sx={{ mb: 2 }}>{tip.title}</Heading>
                <Text sx={{ color: 'omegaDark', fontSize: 1, lineHeight: 1.6 }}>{tip.body}</Text>
              </Box>
            ))}
          </Box>

        </Main>
      </Stack>
    </Layout>
  )
}

export default FlightSearchPage
