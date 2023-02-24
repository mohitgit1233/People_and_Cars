import { useQuery } from '@apollo/client'
import { Card, List } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PEOPLE_AND_CARS } from '../../queries'
import { useParams } from "react-router-dom";

const ShowFull= () => {

    let params = useParams();

    const { loading, error, data } = useQuery(PEOPLE_AND_CARS, {
        variables: { id: params.id },
      });
      

    console.log('Finally',data && data.personWithCars[0].firstName)
  return (
    <div>
        
        <Card title = {(data && data.personWithCars[0].firstName) + ' ' + (data && data.personWithCars[0].lastName)} style={{margin:50,textAlign:'center'}}>
        {data && data.personWithCars.map(({ id, make, model, price, year })=>{
            return(
                <>
                <List.Item key={id}>
                   <strong>Car:</strong> {make}  {model}
                    <br></br>
                    <strong>Price:</strong> {price}
                   <br></br>
                   <strong>Year:</strong>  {year}
                </List.Item>
                <br/>
                </>
            )
        })}
          
        </Card>
        <Link to='/'><h3 style={{textAlign:'center'}}>GO BACK HOME</h3></Link>
    </div>
  )
}

export default ShowFull
