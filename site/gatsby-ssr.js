const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('meta', {
      key: 'algolia-site-verification',
      name: 'algolia-site-verification',
      content: 'DB8C6057FE958D3A'
    }),
    React.createElement('link', {
      key: 'urbanist-font',
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@700&display=swap'
    }),
    React.createElement('script', {
      key: 'getyourguide-analytics',
      async: true,
      defer: true,
      src: 'https://widget.getyourguide.com/dist/pa.umd.production.min.js',
      'data-gyg-partner-id': 'H8Y3KHZ'
    })
  ])
}
