export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  places: string[];
}

export interface Place {
  id: string;
  title: string;
  description: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
}
