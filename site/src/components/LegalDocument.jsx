import React from 'react'
import { Box } from 'theme-ui'

const legalStyles = {
  a: {
    color: 'primary',
    textDecoration: 'none'
  },
  'a:hover': {
    textDecoration: 'underline'
  },
  p: {
    color: 'text',
    lineHeight: 'body',
    mb: 3
  },
  h2: {
    variant: 'text.h3',
    mt: 5,
    mb: 3
  },
  h3: {
    fontSize: 2,
    mt: 4,
    mb: 2
  },
  h4: {
    fontSize: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    mt: 3,
    mb: 2
  },
  h5: {
    fontSize: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    mb: 1
  },
  ul: {
    pl: 4,
    mb: 3
  },
  ol: {
    pl: 4,
    mb: 3
  },
  li: {
    mb: 2
  },
  details: {
    border: '1px solid',
    borderColor: 'omegaLighter',
    borderRadius: 'default',
    p: 3,
    mb: 3,
    bg: 'omegaLightest'
  },
  summary: {
    cursor: 'pointer',
    listStyle: 'none'
  },
  'summary::-webkit-details-marker': {
    display: 'none'
  },
  '.cmplz-subtitle': {
    fontWeight: 'bold',
    mt: 3,
    mb: 2
  },
  '.screen-reader-text': {
    display: 'none'
  },
  'input[type="checkbox"]': {
    display: 'none'
  },
  '#cmplz-manage-consent-container-nojavascript': {
    fontSize: 1,
    color: 'text',
    bg: 'omegaLightest',
    borderRadius: 'default',
    p: 3,
    mb: 3
  },
  '.cookies-per-purpose': {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, 160px) 1fr',
    columnGap: 3,
    rowGap: 2,
    mt: 3
  },
  '.purpose': {
    gridColumn: '1 / -1'
  },
  '.name-header, .retention-header, .function-header': {
    fontWeight: 'bold',
    color: 'text'
  },
  '.name, .retention, .function': {
    color: 'text'
  }
}

const LegalDocument = ({ html }) => (
  <Box sx={legalStyles} dangerouslySetInnerHTML={{ __html: html }} />
)

export default LegalDocument
