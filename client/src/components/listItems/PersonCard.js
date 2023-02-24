import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import RemovePeople from '../buttons/RemovePeople'
import UpdatePeople from '../forms/UpdatePeople'
import Car from '../lists/Car'
import { Link } from 'react-router-dom'


const getStyles = () => ({
  card: {
    width: '1200px'
  }
})

const PersonCard = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const styles = getStyles()

    console.log('locha',props.id)

    const [editMode,setEditMode] = useState(false)

    const handleButtonClick = () => {
      setEditMode(!editMode)
    }

    const updateStateVariable = (variable, value) => {
      switch (variable) {
        case 'firstName':
          setFirstName(value)
          break
        case 'lastName':
          setLastName(value)
          break
        default:
          break
      }
    }

    return (
      <div>
      {editMode ? (
        <UpdatePeople
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card title={firstName + ' ' + lastName} 
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePeople id={id} />
          ]}
        >
          <Car person={props.id}/>
          <Link to={ `/people/${id}` } >Know more</Link>
        </Card>
      )}
    </div>
    )
}

export default PersonCard
