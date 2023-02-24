import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import React from 'react'
import { GET_CAR, REMOVE_CAR } from '../../queries'
import filter from 'lodash.filter'

const RemoveCar = ({ id }) => {

  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CAR })
      cache.writeQuery({
        query: GET_CAR,
        data: {
          cars: filter(cars, c => {
            return c.id !== removeCar.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?')

    if (result) {
      removeCar({
        variables: {
          id
        }
      })
    }
  }
  return (
    <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }}></DeleteOutlined>
  )
}

export default RemoveCar