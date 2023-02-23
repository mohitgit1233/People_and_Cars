import { Card } from 'antd'

import { EditOutlined } from '@ant-design/icons'
// import RemoveContact from '../buttons/RemoveContact'
import { useState } from 'react'
// import UpdateContact from '../forms/UpdateContact'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const PersonCard = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)

    return (
        <></>
    )
}

export default PersonCard
