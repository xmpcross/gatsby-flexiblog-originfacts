import React, { useEffect, useRef } from 'react'

const GYGCityWidget = ({
  locationId = '3729',
  localeCode = 'en-US',
  partnerId = 'H8Y3KHZ'
}) => {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    // Remove any existing GYG script so it re-initialises for this page
    const existing = document.querySelector(
      'script[src*="widget.getyourguide.com/dist/pa.umd"]'
    )
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src =
      'https://widget.getyourguide.com/dist/pa.umd.production.min.js'
    script.setAttribute('data-gyg-partner-id', partnerId)
    document.head.appendChild(script)
  }, [partnerId])

  return (
    <div
      data-gyg-href='https://widget.getyourguide.com/default/city.frame'
      data-gyg-location-id={locationId}
      data-gyg-locale-code={localeCode}
      data-gyg-widget='city'
      data-gyg-partner-id={partnerId}
    />
  )
}

export default GYGCityWidget
