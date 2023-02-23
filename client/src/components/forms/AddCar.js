import React, { useEffect, useState } from 'react'
import {v4 as uuidv4}  from 'uuid';
import {Button, Form, Input,Dropdown, message, Space,} from 'antd'
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


      const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
      };

    const onFinish = values => {
        const {year, make,model,price,person} = values
        console.log(id)
        addCar(
             {
            variables:{
                id,
                year,
                make,
                model,
                price,
                person
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CAR })
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
          label: data && data.people[i].firstName,
          key: data && data.people[i].id,
          icon: <UserOutlined />,
        }
      )
    }
  }
      console.log("seeeee",items)
    const menuProps = {
        items,
        onClick: handleMenuClick,
      };
      

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
        name='year'
        rules={[{ required: true, message: 'Please input year!' }]}
      >
        <Input placeholder='Year' />
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
        name='price'
        rules={[{ required: true, message: 'Please input price' }]}
      >
        <Input  placeholder='$' />
      </Form.Item>

      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input person' }]}
      >
    <Dropdown  menu={menuProps}>
      <Button>
        <Space>
          Select a person
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
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