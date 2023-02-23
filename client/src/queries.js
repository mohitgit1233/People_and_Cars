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

// export const UPDATE_PEOPLE = gql`
//   mutation UpdateContact($id: String!, $firstName: String!, $lastName: String!) {
//     updateContact(id: $id, firstName: $firstName, lastName: $lastName) {
//       id
//       firstName
//       lastName
//     }
//   }
// `

// export const REMOVE_POEPLE = gql`
//   mutation RemoveContact($id: String!) {
//     removeContact(id: $id) {
//       id
//       firstName
//       lastName
//     }
//   }
// `