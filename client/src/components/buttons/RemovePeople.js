import { DeleteOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { GET_CAR, GET_PEOPLE, REMOVE_CAR, REMOVE_POEPLE } from '../../queries'
import filter from 'lodash.filter'
import RemoveCar from './RemoveCar'

const RemovePeople = ({ id }) => {

  const [removePeople] = useMutation(REMOVE_POEPLE, {
    update(cache, { data: { removePeople } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE })
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, c => {
            return c.id !== removePeople.id
          })
        }
      })
    }
  })

  const [removeCar] = useMutation(REMOVE_CAR)

  const { loading, error, data } = useQuery(GET_CAR)
    // console.log(data)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this contact?')

    if (result) {
      removePeople({
        variables: {
          id
        }
      })
      data.cars.filter(car => car.personId === id).map(({ id }) => {
        console.log(id)
        removeCar({
        variables:{
         id
        }
      })
       })
      
    }
  }
  return (<>
    <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }}></DeleteOutlined>

    </>
  )
}

export default RemovePeople