const heading = {
  display: `block`,
  color: `heading`,
  fontFamily: `"Urbanist", sans-serif`,
  fontWeight: 700,
  textDecoration: `none`,
  mb: 3
}

export default {
  heading: {
    ...heading
  },
  h1: {
    ...heading,
    fontSize: `2rem`,
    fontWeight: 700
  },
  h2: {
    ...heading,
    fontSize: 4
  },
  h3: {
    ...heading,
    fontSize: 3
  },
  h4: {
    ...heading,
    fontSize: 2
  },
  h5: {
    ...heading,
    fontSize: 1
  },
  medium: {
    fontSize: 3,
    mb: 3
  },
  small: {
    fontSize: 1,
    m: 0
  },
  xsmall: {
    fontSize: 0,
    m: 0
  },
  p: {
    fontFamily: `body`,
    mb: 3
  }
}
