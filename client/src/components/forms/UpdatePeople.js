import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_PEOPLE } from '../../queries'


const UpdatePeople = props => {

    const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)

  const [updatePeople] = useMutation(UPDATE_PEOPLE)

  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values
    updatePeople({
      variables: {
        id,
        firstName,
        lastName
      }
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <Form
    form={form}
    name='update-people-form'
    layout='inline'
    onFinish={onFinish}
    size='large'
    initialValues={{
      firstName: firstName,
      lastName: lastName
    }}
  >
          <Form.Item
        name='firstName'
        label='First Name'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input
          placeholder='First name'
          onChange={e => updateStateVariable('firstName', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name='lastName'
        label='Last Name'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input
          placeholder='Last name'
          onChange={e => updateStateVariable('lastName', e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person Info
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
  </Form>
  )
}

export default UpdatePeople