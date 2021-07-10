import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const StyledMap = styled.div`
  height: 100%;
  width: 90vw;
  max-width: 600px;
`

type MapProps = {
  center: {
    lat: number
    lng: number
  }
  zoom: number
}

const Map = (props: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: props.center,
        zoom: props.zoom,
      })
      new window.google.maps.Marker({ position: props.center, map })
    }
  }, [props.center, props.zoom])
  return <StyledMap ref={mapRef}></StyledMap>
}

export default Map
