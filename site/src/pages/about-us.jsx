import React from 'react'
import { Main, Layout, Stack } from '@layout'
import Divider from '@components/Divider'
import PageTitle from '@components/PageTitle'
import Seo from '@widgets/Seo'
import { Box, Heading, Text } from 'theme-ui'

const sectionStyles = {
  display: 'grid',
  gap: 4
}

const PageAboutUs = props => (
  <Layout {...props}>
    <Seo title='About Us' />
    <Divider />
    <Stack>
      <Main>
        <PageTitle
          header='About Us'
          subheader='OriginFacts shares practical travel guides, planning advice, and destination insights for travelers who want clearer information before they go.'
        />
        <Divider />
        <Box sx={sectionStyles}>
          <Box>
            <Heading as='h2' variant='h3'>
              What We Publish
            </Heading>
            <Text>
              We focus on destination guides, travel tips, accommodation advice,
              and planning resources that help readers make better travel
              decisions.
            </Text>
          </Box>
          <Box>
            <Heading as='h2' variant='h3'>
              Our Approach
            </Heading>
            <Text>
              We aim to keep content straightforward, useful, and easy to scan.
              That means practical recommendations, clear structure, and content
              organized around real traveler needs.
            </Text>
          </Box>
          <Box>
            <Heading as='h2' variant='h3'>
              Contact
            </Heading>
            <Text>
              For general inquiries, partnerships, or editorial questions, use
              the contact page to get in touch.
            </Text>
          </Box>
        </Box>
      </Main>
    </Stack>
  </Layout>
)

export default PageAboutUs
