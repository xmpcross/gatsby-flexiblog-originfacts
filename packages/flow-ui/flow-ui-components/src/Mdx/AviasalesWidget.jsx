import React, { useEffect, useRef } from 'react'

const AviasalesWidget = ({ src }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!src || !containerRef.current) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.async = true
    script.src = src
    script.charset = 'utf-8'

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [src])

  return <div ref={containerRef} />
}

export default AviasalesWidget
