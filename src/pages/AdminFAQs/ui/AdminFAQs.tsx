import { Button, Card, Col, Form, Input, Popconfirm, Row, message } from 'antd'
import { AdminPage } from 'widgets/AdminPage'
import { useCreateFAQ, useDeleteFAQ, useGetFAQs, useUpdateFAQs } from '../api/adminFAQApi';
import { CloseOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const AdminFAQs = () => {
  const { data } = useGetFAQs(null);
  const [updateFAQ] = useUpdateFAQs();
  const [createFAQ] = useCreateFAQ();
  const [deleteFAQ] = useDeleteFAQ();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleFinish = (id: string, values: any) => {
    updateFAQ({ id: id, body: values })
      .then(() => message.success('Вопрос обновлен'))
  }

  const handleDelete = (id: string) => {
    deleteFAQ(id)
      .then(() => {
        message.success('Вопрос удален')
      })
  }

  return (
    <AdminPage>
      <Row gutter={16} wrap>
        <Form.Provider onFormFinish={(name, info) => {
          if (name === 'new') {
            createFAQ(info.values)
              .unwrap()
              .then(() => {
                info.forms['new'].resetFields();
                message.success('Вопрос добавлен');
              });
          } else {
            handleFinish(name, info.values)
          }
        }}>
          {data?.map((faq) => (
            <Col key={faq.id} span={isMobile ? 24 : 8}>
              <Card style={{ marginBlockStart: 5 }} extra={
                <Popconfirm
                  title='Удаление вопроса'
                  description='Вы действительно хотите удалить этот вопрос?'
                  onConfirm={() => handleDelete(faq.id)}
                  okText='Да'
                  cancelText='Нет'
                >
                  <CloseOutlined />
                </Popconfirm>
              }>
                <Form layout='vertical' name={faq.id} initialValues={faq}>
                  <Form.Item label='Вопрос' name='question'>
                    <Input.TextArea autoSize />
                  </Form.Item>
                  <Form.Item label='Ответ' name='answer'>
                    <Input.TextArea autoSize />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>Сохранить</Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          ))}
          <Col span={isMobile ? 24 : 8}>
            <Card style={{ marginBlockStart: 5 }}>
              <Form layout='vertical' name={'new'}>
                <Form.Item label='Вопрос' name='question'>
                  <Input.TextArea autoSize />
                </Form.Item>
                <Form.Item label='Ответ' name='answer'>
                  <Input.TextArea autoSize />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>Добавить</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Form.Provider>
      </Row>
    </AdminPage>
  )
}

export default AdminFAQs;