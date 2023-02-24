import './App.css';
import Title from './components/layout/Title';
import AddPeople from './components/forms/AddPeople';
import People from './components/lists/People';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import AddCar from './components/forms/AddCar';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import ShowFull from './components/fullPage/ShowFull';
import Home from './components/Home';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})


const App = () => {
  return (
    <ApolloProvider client = {client}>
    <div className="App">
      <Title/>
    
      
    </div>
    <Routes>
    <Route path='/' element={<Home/>}/>
        <Route path='/people/:id' element={<ShowFull />}>
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
