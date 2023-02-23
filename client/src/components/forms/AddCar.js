import React, { useEffect, useState } from 'react'
import {v4 as uuidv4}  from 'uuid';
import {Button, Form, Input} from 'antd'
import { useMutation } from '@apollo/client';
import { ADD_CAR, GET_CAR } from '../../queries';
const {  DownOutlined, UserOutlined  } = icons;
const {   Dropdown, message, Space, Tooltip  } = antd;

const AddCar = () => {
 
    const [addCar] = useMutation(ADD_CAR)
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
        const {firstName, lastName} = values
        console.log(id)
        addPeople(
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
                  query: GET_PEOPLE,
                  data: {
                    ...data,
                    people: [...data.car, addCar]
                  }
                })}
        })
    }

    const items = [
        {
          label: '122st menu item',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: '2nd menu item',
          key: '2',
          icon: <UserOutlined />,
        },
        {
          label: '3rd menu item',
          key: '3',
          icon: <UserOutlined />,
          danger: true,
        },
        {
          label: '4rd menu item',
          key: '4',
          icon: <UserOutlined />,
          danger: true,
          disabled: true,
        },
      ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
      };
      

  return (
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
        <Input placeholder='$' />
      </Form.Item>

      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input price' }]}
      >
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Button
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
  )
}

export default AddCar