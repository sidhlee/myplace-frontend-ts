import React from 'react';

import { Place } from '../../shared/models/types';

import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';

const PLACES: Place[] = [
  {
    id: 'p1',
    title: 'Rainbow Cinema',
    description: 'A cozy movie theater near Harbourfront',
    address: 'Rainbow Cinema, Toronto',
    image: 'https://placem.at/places?w=800&random=1',
    location: {
      lat: 43.649584,
      lng: -79.372489,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'The Central',
    description: 'Now-defunct music & comedy club that I used to play at',
    address: 'The central, Bathurst & Bloor, Toronto',
    image: 'https://placem.at/places?w=800&random=2',
    location: {
      lat: 43.664416,
      lng: -79.412119,
    },
    creator: 'u2',
  },
];

const UserPlaces = () => {
  const { userId } = useParams<{ userId: string }>();
  const loadedPlace = PLACES.filter((place) => place.creator === userId);
  return <PlaceList places={loadedPlace} />;
};

export default UserPlaces;
