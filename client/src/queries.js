import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`

export const ADD_PEOPLE = gql`
  mutation AddPeople($id: String!, $firstName: String!, $lastName: String!) {
    addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_PEOPLE = gql`
  mutation UpdatePeople($id: String!, $firstName: String!, $lastName: String!) {
    updatePeople(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_POEPLE = gql`
  mutation RemovePeople($id: String!) {
    removePeople(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const GET_CAR = gql`
  {
    cars {
        id
        year
        make
        model
        price
        personId
      }
  }
`

export const ADD_CAR = gql`
mutation AddCar($addCarId: String, $year: Int, $make: String, $model: String, $price: Float, $personId: String) {
    addCar(id: $addCarId, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId {
        id
        firstName
        lastName
      }
    }
  }
`