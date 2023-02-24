import React, { useEffect, useState } from 'react'
import {v4 as uuidv4}  from 'uuid';
import {Button, Form, Input,Dropdown, message, Space, Select, InputNumber,} from 'antd'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_CAR, GET_PEOPLE } from '../../queries';
import {  DownOutlined, UserOutlined  } from '@ant-design/icons';


const AddCar = () => {
 
    const [addCar] = useMutation(ADD_CAR)
    
    const [peopleData,setPeopleData] = useState(true)
    // const [items,setItems] = useState()
    const { loading, error, data } = useQuery(GET_PEOPLE)

 
  
    const [form] = Form.useForm()
    const id = uuidv4()

    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate([])
      }, [])


      const handleChange = (value) => {
        console.log(`selected ${value}`);
      };

    const onFinish = values => {
        const { year,make,model,price,personId} = values

        addCar(
             {
            variables:{
              id,
                year,
                make,
                model,
                price,
                personId
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CAR })
                console.log("seeeeee",data)
                cache.writeQuery({
                  query: GET_CAR,
                  data: {
                    ...data,
                    cars: [...data.cars, addCar]
                  }
                })}
        })
    }

    const items = [];
    if(data){
    for(let i=0;i<data.people.length;i++){
      items.push(

          {
            value: data && data.people[i].id,
            label: data && data.people[i].firstName,
          }
      
      )
    }
  }
      console.log("seeeee",items)

      

  return (
    <div>
      {items.length > 0 ? 
      <>
        <h2 style={{ textAlign: 'center' }} >Add Car</h2>
    <Form
      name='add-contact-form'
      form={form}
      layout='inline'
      onFinish={onFinish}
      size='large'
      
      style={{ marginBottom: '40px' }}
    >
        <Form.Item
        name='year'
        label='Year'
        rules={[{ required: true, message: 'Please input year!' }]}
      >
        <InputNumber  placeholder='Year' />
      </Form.Item>

      <Form.Item
        name='make'
        label='Make'
        rules={[{ required: true, message: 'Please input maker' }]}
      >
        <Input placeholder='Make' />
      </Form.Item>

      <Form.Item
        name='model'
        label='Model'
        rules={[{ required: true, message: 'Please input model' }]}
      >
        <Input placeholder='Model' />
      </Form.Item>


      <Form.Item
        name='price'
        label='Price'
        rules={[{ required: true, message: 'Please input price' }]}
      >
        <InputNumber 
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
        placeholder='$'
        style={{
          width: 150,
        }} />
      </Form.Item>

      <Form.Item
        name='personId'
        label='Person'
        rules={[{ required: true, message: 'Please input person' }]}
      >
     <Select
      placeholder='Select a person'
      style={{
        width: 190,
        textAlign:'left'
      }}
      onChange={handleChange}
      options={items}
    />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
    </>: <></>    }
    </div>
  )
}

export default AddCar