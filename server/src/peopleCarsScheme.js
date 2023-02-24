import { gql } from "apollo-server-express"
import { find, remove } from "lodash";
const { mergeTypeDefs } = require('graphql-schema-merger');


const peopleArray = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const carsArray = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

const typeDefs = gql`#graphql
  
  type People {
    id: String
    firstName: String
    lastName: String
  }

  type Car {
    id: String
    year: Int
    make : String
    model : String
    price : Float
    personId: String
  }

  type Query{
    people : [People]
    cars : [Car]
  }

  type Mutation{
    addPeople(id: String, firstName:String!, lastName:String!):People
    updatePeople(id: String, firstName:String!, lastName:String!):People
    removePeople(id: String):People

    addCar(id:String,
      year: Int
      make : String
      model : String
      price : Float
      personId: String ):Car

      updateCar(id:String,
        year: Int
        make : String
        model : String
        price : Float
        personId: String ):Car

      removeCar(id: String):Car

      getCarByPersonId(id: String):Car
    
  }
`

const resolvers = {
  
  Query: {
    people: () => peopleArray,
    cars: () => carsArray,
    
  },
  // Car: {
  //   personId : ( args, context) => {
  //     return find(peopleArray, { id: args.personId})
  //   }
  // },
  Mutation: {
    
    addPeople : (root,args) =>{
      
      const newPeople = {
        id : args.id,
        firstName: args.firstName,
        lastName:  args.lastName
      }
      peopleArray.push(newPeople)

      return newPeople
    },
    updatePeople : (root,args) =>{
      const people = find(peopleArray, {id: args.id})
      if(!people) throw new Error('Could not find the people info with id : ' + args.id)

      people.firstName = args.firstName,
      people.lastName = args.lastName

      return people
    },
    removePeople: (root, args) => {
      const removedPeople = find(peopleArray, { id: args.id })

      if (!removedPeople) throw new Error(`Couldn't find people with id ${args.id}`)

      remove(peopleArray, c => {
        return c.id === removedPeople.id
      })

      return removedPeople
    }
    
    
    ,addCar : (root,args) => {
   
      const newCar = {
        id : args.id,
        year: args.year,
        make:  args.make,
        model: args.model,
        price : args.price,
        personId : args.personId
  
      }
  
      carsArray.push(newCar)
  
      return newCar
    },
    updateCar : (root,args) =>{
      const car = find(carsArray, {id: args.id})
      if(!car) throw new Error('Could not find the car info with id : ' + args.id)

      car.year = args.year,
      car.make = args.make,
      car.price = args.price,
      car.personId = args.personId
      
      return people
    },
    removeCar: (root, args) => {
      const removedCar = find(carsArray, { id: args.id })

      if (!removedCar) throw new Error(`Couldn't find contact with id ${args.id}`)

      remove(carsArray, c => {
        return c.id === removedCar.id
      })

      return removedCar
    },
    getCarByPersonId: (root,args) =>{
      const all_cars = find(carsArray, {personId : args.id})
      if(!all_cars) throw new Error(`Couldn't find any cars for person with id = ${args.id}`)

      return all_cars
    }
  }
  
}

export {typeDefs, resolvers}