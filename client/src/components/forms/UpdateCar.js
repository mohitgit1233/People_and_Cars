import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { GET_PEOPLE, UPDATE_CAR } from '../../queries'



const UpdateCar = props => {

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [id] = useState(props.id)
  const [year,setYear] = useState(props.year)
  const [make,setMake] = useState(props.make)
  const [model,setModel] = useState(props.model)
  const [price,setPrice] = useState(props.price)
  const [personId,setPersonId] = useState(props.personId)

  const [updateCar] = useMutation(UPDATE_CAR)
  const { loading, error, data } = useQuery(GET_PEOPLE)

  useEffect(() => {
    forceUpdate()
  }, [])
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = values => {
    const { year,make,model,price, personId } = values
    console.log("hey bro",values)
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      }
    })
    props.onButtonClick()
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

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
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
            setPrice(value)
            break
        case 'personId':
            setPersonId(value)
            break
      default:
        break
    }
  }

  return (
    <Form
    form={form}
    name='update-car-form'
    layout='inline'
    onFinish={onFinish}
    size='large'
    initialValues={{
      year:year,
      make:make,
      model:model,
      price:price,
      personId:personId
    }}
  >
    <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input year' }]}
      >
        <Input
          placeholder='Year'
          onChange={e => updateStateVariable('year', e.target.value)}
        />
    </Form.Item>
    
    <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input maker' }]}
      >
        <Input
          placeholder='Make'
          onChange={e => updateStateVariable('make', e.target.value)}
        />
    </Form.Item>

    <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input Model' }]}
      >
        <Input
          placeholder='Model'
          onChange={e => updateStateVariable('Model', e.target.value)}
        />
    </Form.Item>

    <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input price' }]}
      >
        <Input
          placeholder='Price'
          onChange={e => updateStateVariable('price', e.target.value)}
        />
    </Form.Item>

    <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input person' }]}
      >
    <Select
    default={personId}
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
              (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car Info
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
  </Form>
  )
}

export default UpdateCar