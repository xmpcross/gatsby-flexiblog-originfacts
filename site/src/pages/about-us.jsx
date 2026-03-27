import React from 'react'
import { Main, Layout, Stack } from '@layout'
import Divider from '@components/Divider'
import PageTitle from '@components/PageTitle'
import Seo from '@widgets/Seo'
import { Box, Heading, Text, Link } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'

const styles = {
  hero: {
    display: 'grid',
    gridTemplateColumns: ['1fr', null, '1fr 1fr'],
    gap: 5,
    alignItems: 'center',
    mb: 6
  },
  heroText: {},
  heroLead: {
    fontSize: '1.2rem',
    lineHeight: 1.7,
    color: 'omegaDark',
    mt: 3
  },
  imageHolder: {
    bg: 'omegaLighter',
    borderRadius: 'lg',
    overflow: 'hidden',
    aspectRatio: '4 / 3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: 'omegaLight',
    minHeight: '280px'
  },
  imageHolderLabel: {
    color: 'omegaDark',
    fontSize: 1,
    textAlign: 'center',
    px: 4
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: ['1fr 1fr', null, 'repeat(4, 1fr)'],
    gap: 4,
    py: 5,
    px: 4,
    bg: 'omegaLighter',
    borderRadius: 'lg',
    mb: 6,
    textAlign: 'center'
  },
  statItem: {},
  statNumber: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'alpha',
    lineHeight: 1
  },
  statLabel: {
    fontSize: 1,
    color: 'omegaDark',
    mt: 1
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: ['1fr', null, '1fr 1fr 1fr'],
    gap: 4,
    mb: 6
  },
  valueCard: {
    p: 4,
    bg: 'omegaLighter',
    borderRadius: 'lg',
    borderTop: '3px solid',
    borderColor: 'alpha'
  },
  valueIcon: {
    fontSize: '2rem',
    mb: 2,
    display: 'block'
  },
  teamSection: {
    display: 'grid',
    gridTemplateColumns: ['1fr', null, '1fr 1fr'],
    gap: 5,
    alignItems: 'center',
    mb: 6
  },
  teamImageHolder: {
    bg: 'omegaLighter',
    borderRadius: 'lg',
    aspectRatio: '3 / 4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: 'omegaLight',
    height: '429px',
    width: '600px'
  },
  ctaBox: {
    textAlign: 'center',
    py: 6,
    px: 4,
    bg: 'alpha',
    borderRadius: 'lg',
    mb: 2
  },
  ctaHeading: {
    color: 'white',
    mb: 2
  },
  ctaText: {
    color: 'white',
    opacity: 0.9,
    mb: 4
  },
  ctaButton: {
    display: 'inline-block',
    bg: 'white',
    color: 'alpha',
    fontWeight: 700,
    px: 4,
    py: 2,
    borderRadius: 'full',
    textDecoration: 'none',
    fontSize: '1rem'
  }
}

const PageAboutUs = props => (
  <Layout {...props}>
    <Seo title='About Us' />
    <Divider />
    <Stack>
      <Main>
        <PageTitle
          header='About OriginFacts'
          subheader='We help travelers go further with clearer information, practical guides, and honest advice — before, during, and after the trip.'
        />
        <Divider />

        {/* Hero Section */}
        <Box sx={styles.hero}>
          <Box sx={styles.heroText}>
            <Heading as='h2' variant='h2'>
              Origin: You. Destination: Everywhere.
            </Heading>
            <Text sx={styles.heroLead}>
              Welcome to Originfacts, the digital compass for the modern traveler.
            </Text>
            <Text sx={{ ...styles.heroLead, mt: 3 }}>
              We're obsessed with the "facts" of travel — the real numbers, the best routes,
              and the secret hacks that turn a standard trip into an extraordinary adventure.
              We believe that world-class travel shouldn't be reserved for the elite.
            </Text>
            <Text sx={{ ...styles.heroLead, mt: 3 }}>
              Whether you're looking for a last-minute flight deal, a boutique hotel that won't
              break the bank, or a road trip itinerary through uncharted territory, we've done
              the legwork so you don't have to.
            </Text>
            <Text sx={{ ...styles.heroLead, mt: 3, fontWeight: 700, color: 'heading' }}>
              Stop dreaming and start packing. We've got the facts covered.
            </Text>
          </Box>
          <Box sx={{ ...styles.imageHolder, border: 'none', p: 0 }}>
            <StaticImage
              src='../../content/assets/about-us.jpg'
              alt='About OriginFacts'
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
              objectFit='cover'
            />
          </Box>
        </Box>

        {/* Values */}
        <Heading as='h2' variant='h2' sx={{ mb: 4 }}>
          Essintial Guides
        </Heading>
        <Box sx={styles.valuesGrid}>
          <Box sx={styles.valueCard}>
            <Text as='span' sx={styles.valueIcon}>🗺️</Text>
            <Heading as='h3' variant='h4' sx={{ mb: 2 }}>Flight Deals</Heading>
            <Text sx={{ color: 'omegaDark', fontSize: 1, lineHeight: 1.6 }}>
              Every article is written around what a traveler needs to know, not what
              is easiest to publish. We skip filler and focus on what actually helps.
            </Text>
          </Box>
          <Box sx={styles.valueCard}>
            <Text as='span' sx={styles.valueIcon}>🔍</Text>
            <Heading as='h3' variant='h4' sx={{ mb: 2 }}>Cheap Hotels</Heading>
            <Text sx={{ color: 'omegaDark', fontSize: 1, lineHeight: 1.6 }}>
              We cover the downsides alongside the highlights. Travel decisions are
              better when the information is balanced rather than promotional.
            </Text>
          </Box>
          <Box sx={styles.valueCard}>
            <Text as='span' sx={styles.valueIcon}>📐</Text>
            <Heading as='h3' variant='h4' sx={{ mb: 2 }}>Car Rentals</Heading>
            <Text sx={{ color: 'omegaDark', fontSize: 1, lineHeight: 1.6 }}>
              Our guides are built to scan. Clear headings, logical flow, and
              content organized by how travelers actually think through a trip.
            </Text>
          </Box>
        </Box>

        <Divider />

        {/* Mission & Vision */}
        <Box sx={styles.teamSection}>
          <Box sx={{ ...styles.teamImageHolder, border: 'none', p: 0 }}>
            <StaticImage
              src='../../content/assets/travel-journey.jpg'
              alt='Your journey starts here'
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
              objectFit='cover'
            />
          </Box>
          <Box>
            <Heading as='h2' variant='h2' sx={{ mb: 3 }}>Your Journey Starts Here</Heading>
            <Text sx={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'omegaDark', mb: 3 }}>
              They say a journey of a thousand miles begins with a single step. At Originfacts,
              we believe that step should be the most informed one you ever take.
            </Text>
            <Text sx={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'omegaDark', mb: 3 }}>
              Navigating the world of travel can be overwhelming. Between fluctuating flight prices,
              endless hotel reviews, and the complexities of car rentals, the "dream vacation" can
              quickly feel like a full-time job. That's why we built Originfacts — your definitive
              starting point for smarter, smoother travel.
            </Text>
            <Heading as='h3' variant='h4' sx={{ mb: 3 }}>What We Offer</Heading>
            <Box as='ul' sx={{ pl: 3, mb: 3 }}>
              <Box as='li' sx={{ mb: 2, fontSize: '1.05rem', lineHeight: 1.7, color: 'omegaDark' }}>
                <Text as='span' sx={{ fontWeight: 700, color: 'heading' }}>Strategic Guides: </Text>
                Deep dives into the world's most iconic (and hidden) destinations.
              </Box>
              <Box as='li' sx={{ mb: 2, fontSize: '1.05rem', lineHeight: 1.7, color: 'omegaDark' }}>
                <Text as='span' sx={{ fontWeight: 700, color: 'heading' }}>Budget Mastery: </Text>
                Expert tips on finding cheap flights and luxury stays for less.
              </Box>
              <Box as='li' sx={{ mb: 2, fontSize: '1.05rem', lineHeight: 1.7, color: 'omegaDark' }}>
                <Text as='span' sx={{ fontWeight: 700, color: 'heading' }}>Seamless Logistics: </Text>
                Honest reviews and guides for car rentals and transit.
              </Box>
            </Box>
            <Text sx={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'omegaDark', fontStyle: 'italic' }}>
              We don't just tell you where to go; we show you the best way to get there.
            </Text>
          </Box>
        </Box>

        <Divider />

        {/* CTA */}
        <Box sx={styles.ctaBox}>
          <Heading as='h2' variant='h2' sx={styles.ctaHeading}>
            Have a question or want to work together?
          </Heading>
          <Text sx={styles.ctaText}>
            For editorial inquiries, partnerships, or general questions, we are happy to hear from you.
          </Text>
          <Link href='/contact' sx={styles.ctaButton}>
            Get in Touch
          </Link>
        </Box>

      </Main>
    </Stack>
  </Layout>
)

export default PageAboutUs
