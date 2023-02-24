import React from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'

// import RemoveCard from '../buttons/RemovePeople'
// import UpdateCard from '../forms/UpdatePeople'
const getStyles = () => ({
    card: {
      width: '5000px'
    }
  })
const CarCard = props => {

    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(new Intl.NumberFormat('en-US').format(props.price))
    const [personId, setPersonId] = useState(props.personId)
    const styles = getStyles()

    const [editMode,setEditMode] = useState(false)

    const handleButtonClick = () => {
      setEditMode(!editMode)
    }

    const updateStateVariable = (variable, value) => {
       
      switch (variable) {
          case 'year':
              setYear(value)
              break
          case 'make':
              setMake(value)
              break
          case 'model':
              setModel(value)
              break
          case 'price':
              setPrice(parseFloat(value))
              break
          case 'personId':
              setPersonId(value)
              break
        default:
          break
      }
    }


  return (
    <div>
    {editMode ? (
      <UpdateCar
        id={props.id}
        year={props.year}
        make={props.make}
        model={props.model}
        price={props.price}
        personId={props.personId}
        onButtonClick={handleButtonClick}
        updateStateVariable={updateStateVariable}
      />
    ) : (
      <Card title={year + '  ' + make + '  ' + model + '   ' + ' -> ' + price} 
      type = 'inner'
        // style={styles.card}
        actions={[
          <EditOutlined key='edit' onClick={handleButtonClick} />,
          <RemoveCar id={id} />
        ]}
      >
    
      </Card>
     )} 
  </div>
  )
}

export default CarCard