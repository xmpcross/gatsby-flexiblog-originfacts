const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key='getyourguide-analytics'
      async
      defer
      src='https://widget.getyourguide.com/dist/pa.umd.production.min.js'
      data-gyg-partner-id='H8Y3KHZ'
    />
  ])
}
