import { useQuery } from '@apollo/client'
import { Card, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PEOPLE_AND_CARS } from '../../queries'
import { useParams } from "react-router-dom";

const ShowFull= () => {

    let params = useParams();
  
    const { loading, error, data } = useQuery(PEOPLE_AND_CARS, {
        variables: { id: params.id }
      });


  return (
    <div>
        {data && data.personWithCars.length > 0 ? <>
        
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
        </>:  <h2 style={{textAlign:'center'}}>No Cars to Show</h2>}
        <Link to='/'><h3 style={{textAlign:'center'}}>GO BACK HOME</h3></Link>
    </div>
  )
}

export default ShowFull
