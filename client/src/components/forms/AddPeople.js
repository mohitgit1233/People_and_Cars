import React, { useEffect, useState } from 'react'
import {v4 as uuidv4}  from 'uuid';
import { useId } from 'react';
import {Button, Form, Input} from 'antd'
import { useMutation } from '@apollo/client';
import { ADD_PEOPLE, GET_PEOPLE } from '../../queries';

const AddPeople = () => {
    // const [id] = useState((Math.floor(100000 + Math.random() * 900000)).toString())
    const [addPeople] = useMutation(ADD_PEOPLE)
    const [form] = Form.useForm()
    const id = uuidv4()

    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate([])
      }, [])

    const onFinish = values => {
        const {firstName, lastName} = values
        console.log(id)
        addPeople(
             {
            variables:{
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPeople } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE })
                cache.writeQuery({
                  query: GET_PEOPLE,
                  data: {
                    ...data,
                    people: [...data.people, addPeople]
                  }
                })}
        })
    }


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
        name='firstName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item
        name='lastName'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder='Last Name' />
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
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddPeople