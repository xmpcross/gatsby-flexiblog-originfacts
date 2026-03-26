import React, { useEffect, useRef } from 'react'

const TravelpayoutsFlightWidget = () => {
  const containerRef = useRef(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current || !containerRef.current) return
    loaded.current = true

    const script = document.createElement('script')
    script.async = true
    script.src =
      'https://tpscr.com/content?currency=usd&trs=401311&shmarker=314807&color_button=%23FF0000&target_host=www.aviasales.com%2Fsearch&locale=en&powered_by=false&origin=SYD&destination=BKK&with_fallback=false&non_direct_flights=true&min_lines=10&border_radius=0&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&promo_id=2811&campaign_id=100'
    script.charset = 'utf-8'
    containerRef.current.appendChild(script)
  }, [])

  return <div ref={containerRef} />
}

export default TravelpayoutsFlightWidget
