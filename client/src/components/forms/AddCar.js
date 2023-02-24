import React, { useEffect, useState } from 'react'
import {v4 as uuidv4}  from 'uuid';
import {Button, Form, Input,Dropdown, message, Space, Select,} from 'antd'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_CAR, GET_PEOPLE } from '../../queries';
import {  DownOutlined, UserOutlined  } from '@ant-design/icons';


const AddCar = () => {
 
    const [addCar] = useMutation(ADD_CAR)
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
        const { y,make,model,p,personId} = values
        const year = parseInt(y)
        const price = parseFloat(p)
       
      
        
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
                    people: [...data.car, addCar]
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
        <h2>Add Car</h2>
    <Form
      name='add-contact-form'
      form={form}
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
        <Form.Item
        name='y'
       
        rules={[{ required: true, message: 'Please input year!' }]}
      >
        <Input  placeholder='Year' />
      </Form.Item>

      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input maker' }]}
      >
        <Input placeholder='Make' />
      </Form.Item>

      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input model' }]}
      >
        <Input placeholder='Model' />
      </Form.Item>


      <Form.Item
        name='p'
        rules={[{ required: true, message: 'Please input price' }]}
      >
        <Input  placeholder='$' />
      </Form.Item>

      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input person' }]}
      >
     <Select
      placeholder='Select a person'
      style={{
        width: 190,
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
    </div>
  )
}

export default AddCar