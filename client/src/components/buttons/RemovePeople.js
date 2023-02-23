import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import React from 'react'
import { GET_PEOPLE, REMOVE_POEPLE } from '../../queries'
import filter from 'lodash.filter'

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

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this contact?')

    if (result) {
      removePeople({
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

export default RemovePeople