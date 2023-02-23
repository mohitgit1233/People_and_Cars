import React from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import RemoveCar from '../buttons/RemoveCar'
// import RemoveCard from '../buttons/RemovePeople'
// import UpdateCard from '../forms/UpdatePeople'
const getStyles = () => ({
    card: {
      width: '500px'
    }
  })
const CarCard = props => {

    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [person, setPerson] = useState(props.person)
    const styles = getStyles()

    const [editMode,setEditMode] = useState(false)

    const handleButtonClick = () => {
      setEditMode(!editMode)
    }

    const updateStateVariable = (variable, value) => {
    //   switch (variable) {
    //     case 'firstName':
    //       setFirstName(value)
    //       break
    //     case 'lastName':
    //       setLastName(value)
    //       break
    //     default:
    //       break
    //   }
    }


  return (
    <div>
    {/* {editMode ? (
      <UpdatePeople
        id={props.id}
        firstName={props.firstName}
        lastName={props.lastName}
        onButtonClick={handleButtonClick}
        updateStateVariable={updateStateVariable}
      />
    ) : ( */}
      <Card title={year + make} 
      type = 'inner'
        // style={styles.card}
        actions={[
          <EditOutlined key='edit' onClick={handleButtonClick} />,
          <RemoveCar id={id} />
        ]}
      >
    
      </Card>
    {/* )} */}
  </div>
  )
}

export default CarCard