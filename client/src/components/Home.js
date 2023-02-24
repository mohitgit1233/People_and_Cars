import '../App.css';


import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import React from 'react';
import AddPeople from './forms/AddPeople';
import AddCar from './forms/AddCar';
import People from './lists/People';

const Home = () => {
  return (
    <div>
  <AddPeople />
      <AddCar />
      <People />
    </div>
  )
}

export default Home