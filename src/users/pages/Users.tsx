import React from 'react';
import UserList from '../components/UserList';

const USERS = [
  {
    id: 'u1',
    name: 'Sid',
    email: 'test@test.com',
    image: 'https://placem.at/people?w=400&random=1',
    places: [],
  },
  {
    id: 'u2',
    name: 'Nayoun',
    email: 'test2@test.com',
    image: 'https://placem.at/people?w=400&random=2',
    places: [],
  },
];

const Users: React.FC = (props) => {
  return <UserList users={USERS} />;
};

export default Users;
