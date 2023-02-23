import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { useState } from 'react'
import { GET_CAR } from '../../queries'
import CarCard from '../listItems/CarCard'

const getStyles = () => ({
//   list: {
//     display: 'flex',
//     justifyContent: 'center'
//   }
})

const Car = props => {
  const styles = getStyles()
  const person = useState(props.person)

  console.log("12",person[0])

  const { loading, error, data } = useQuery(GET_CAR)
    // console.log(data)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
//   if (!data) return null

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
         {data.cars
            .filter(car => car.personId === person[0]) // filter cars by personId 
             .map(({ id, make, model, price, year, personId }) => (
              <List.Item key={id}>
                  <CarCard key={id} id={id} make={make} model={model} price={price} year={year} personId={personId}/>
             </List.Item>
  ))
}
     
    </List>
  )
}

export default Car