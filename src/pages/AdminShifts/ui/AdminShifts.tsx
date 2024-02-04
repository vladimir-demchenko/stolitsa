import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Space, message } from 'antd'
import { AdminPage } from 'widgets/AdminPage'
import { useGetShifts, useUpdateShift } from '../api/adminShiftsApi'
import dayjs from 'dayjs';
import { CloseOutlined } from '@ant-design/icons';

const AdminShifts = () => {
  const { data, isLoading } = useGetShifts(null);
  const [updateShift] = useUpdateShift();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (id: string, values: any) => {
    updateShift({
      id, body: {
        ...values,
        descriptions: values.descriptions.map((i: Record<string, string>) => i.name),
        expire_time: values.expire_time.format('YYYY-MM-DD')
      }
    }).unwrap()
      .then(() => {
        messageApi.success('Смена успешно обновлена!')
      })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AdminPage>
      {contextHolder}
      <Row gutter={16} wrap>
        <Form.Provider onFormFinish={(name, info) => {
          handleFinish(name, info.values)
        }}>
          {data?.map((shift) => (
            <Col key={shift.id}>
              <Card style={{ marginBlockStart: 5 }}>
                <Form layout='vertical' name={shift.id} initialValues={{ ...shift, expire_time: dayjs(shift.expire_time).locale('ru'), descriptions: shift.descriptions.map((description) => ({ name: description })) }}>
                  <Form.Item label='Даты' name='date'>
                    <Input />
                  </Form.Item>
                  <Form.Item label='Название' name='title'>
                    <Input />
                  </Form.Item>
                  <Form.Item label='Описание'>
                    <Form.List name='descriptions'>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <div style={{ display: 'flex', gap: 5 }} key={key}>
                              <Form.Item name={[name, 'name']} {...restField}>
                                <Input />
                              </Form.Item>
                              <Button onClick={() => remove(name)} type='text'><CloseOutlined /></Button>
                            </div>
                          ))}
                          <Button type='dashed' onClick={() => add()}>Добавить</Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Form.Item label='Регистрация до' name='expire_time'>
                    <DatePicker />
                  </Form.Item>
                  <Form.Item label='Регистрация открыта' name='open_reg' valuePropName='checked'>
                    <Checkbox />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>Сохранить</Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          ))}
        </Form.Provider>
      </Row>
    </AdminPage>
  )
}

export default AdminShifts;