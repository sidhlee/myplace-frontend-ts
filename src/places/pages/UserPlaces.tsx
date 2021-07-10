import { useState, useEffect } from 'react'

import { Place } from '../../shared/models/types'

import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'
import { useRequest } from '../../shared/hooks/useRequest'

type FetchPlacesResponse = {
  places: Place[]
}

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[] | null>(null)

  const { userId } = useParams<{ userId: string }>()
  const { sendRequest } = useRequest()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/places/user/${userId}`
        const responseData = await sendRequest<FetchPlacesResponse>(url)
        if (responseData) {
          setLoadedPlaces(responseData.places)
        }
      } catch {}
    }
    fetchPlaces()

    // userId is from url param which don't change as long as we stay on the page
  }, [sendRequest, userId])

  const updateLoadedPlaces = (placeId: string) => {
    if (loadedPlaces) {
      const updated = loadedPlaces.filter((place) => place.id !== placeId)
      setLoadedPlaces(updated)
    }
  }

  return (
    <PlaceList places={loadedPlaces} updateLoadedPlaces={updateLoadedPlaces} />
  )
}

export default UserPlaces
