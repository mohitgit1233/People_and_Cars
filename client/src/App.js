import './App.css';
import Title from './components/layout/Title';
import AddPeople from './components/forms/AddPeople';
import People from './components/lists/People';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import AddCar from './components/forms/AddCar';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})


const App = () => {
  return (
    <ApolloProvider client = {client}>
    <div className="App">
      <Title/>
      <AddPeople />
      <AddCar />
      <People />
    </div>
    </ApolloProvider>
  );
}

export default App;
