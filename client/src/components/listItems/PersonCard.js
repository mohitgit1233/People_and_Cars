import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import RemovePeople from '../buttons/RemovePeople'
import UpdatePeople from '../forms/UpdatePeople'


const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const PersonCard = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const styles = getStyles()

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
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePeople id={id} />
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </div>
    )
}

export default PersonCard
