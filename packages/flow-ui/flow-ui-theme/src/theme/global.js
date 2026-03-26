export default {
  html: {
    fontSize: [`85%`, `90%`, `95%`, `100%`],
    scrollBehavior: `smooth`
  },
  '.text-heading-title2': {
    fontSize: `24px`,
    marginBottom: `20px`
  },
  '.font-base': {
    fontFamily: `"Urbanist", sans-serif`
  },
  '::selection': {
    color: t => t.colors.white,
    background: t => t.colors.omegaDark
  }
}
