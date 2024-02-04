import { useParams } from 'react-router'
import { useGetUser, useUpdateApprove, useUpdateCreativeTask, useUpdateDetailInfo, useUpdatePersonalInfo, useUpdateShift } from '../api/adminUserProfileApi'
import { AdminPage } from 'widgets/AdminPage';
import { Button, Card, Col, DatePicker, Form, Input, Popconfirm, Row, Space, Typography, message } from 'antd';
import dayjs from 'dayjs';


const AdminUserProfile = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id as string, { skip: !id });
  const [updatePersonalInfo] = useUpdatePersonalInfo();
  const [updateDetailInfo] = useUpdateDetailInfo();
  const [updateUserShift] = useUpdateShift();
  const [updateCreativeTask] = useUpdateCreativeTask();
  const [updateApprove] = useUpdateApprove();

  const handleResetApprove = () => {
    if (!data?.approve_shift) {
      message.warning('У пользователя не подтверждена смена!')
    } else {
      updateApprove({ id: id, approve_shift: false })
        .then(() => message.success('Подтвреждение сброшено!'))
    }
  }

  const handleResetShift = () => {
    updateUserShift({ id: id, shiftID: null })
      .then(() => message.success('Смена сброшена!'))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AdminPage>
      <Space direction='vertical'>
        <Form.Provider
          onFormFinish={(name, info) => {
            if (name === 'personalInfo') {
              updatePersonalInfo({ id: id, ...info.values })
                .then(() => message.success('Личная информация обновлена'));
            }
            if (name === 'userInfo') {
              updateDetailInfo({ id: id, ...info.values })
                .then(() => message.success('Детальная информация обновлена'))
            }
            if (name === 'creativeTask') {
              updateCreativeTask({ id: id, ...info.values })
                .then(() => message.success('Творческое задание обновлено!'))
            }
          }}
        >
          <Card>
            <Form layout='horizontal' name='personalInfo' initialValues={{ ...data, birthday: dayjs(data?.birthday).locale('ru') }}>
              <Form.Item label='Email'>
                <Typography.Text strong>
                  {data?.login}
                </Typography.Text>
              </Form.Item>
              <Form.Item label='Фамилия' name='lastname'>
                <Input />
              </Form.Item>
              <Form.Item label='Имя' name='firstname'>
                <Input />
              </Form.Item>
              <Form.Item label='Отчество' name='secondname'>
                <Input />
              </Form.Item>
              <Form.Item label='Дата рождения' name='birthday'>
                <DatePicker />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card>
            <Form name='userInfo' initialValues={data}>
              <Form.Item label='Пол' name='sex'>
                <Input />
              </Form.Item>
              <Form.Item label='Гражданство' name='citizenship'>
                <Input />
              </Form.Item>
              <Form.Item label='Телефон' name='phone'>
                <Input />
              </Form.Item>
              <Form.Item label='Серия паспорта' name='passport_series'>
                <Input />
              </Form.Item>
              <Form.Item label='Номер паспорта' name='passport_number'>
                <Input />
              </Form.Item>
              <Form.Item label='Место рождения' name='place_of_birth'>
                <Input />
              </Form.Item>
              <Form.Item label='Фактическая место жительства' name='actual_living'>
                <Input />
              </Form.Item>
              <Form.Item label='Прописка' name='registration_living'>
                <Input />
              </Form.Item>
              <Form.Item label='Место учебы/работы' name='place_of_work'>
                <Input />
              </Form.Item>
              <Form.Item label='Должность' name='position'>
                <Input />
              </Form.Item>
              <Form.Item label='Телеграм' name='tg_name'>
                <Input />
              </Form.Item>
              <Form.Item label='Вк' name='vk_link'>
                <Input />
              </Form.Item>
              <Form.Item label='Хронические заболевания' name='illness'>
                <Input />
              </Form.Item>
              <Form.Item label='Откуда ты узнал' name='find_out'>
                <Input.TextArea autoSize />
              </Form.Item>
              <Form.Item label='Какие навыки ты бы хотел получить' name='future_skills'>
                <Input.TextArea autoSize />
              </Form.Item>
              <Form.Item label='О себе' name='about_yourself'>
                <Input.TextArea autoSize />
              </Form.Item>
              <Form.Item label='Почему хочешь принять участие' name='take_part'>
                <Input.TextArea autoSize />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card>
            <Form name='creativeTask' initialValues={data}>
              <Form.Item label='Творческое задание' name='creative_task'>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Form.Provider>
        <Card>
          <Space direction='vertical'>
            <Space align='start'>
              <Typography.Paragraph>
                Выбранная смена:
              </Typography.Paragraph>
              <Typography.Text strong>
                {data?.shift?.title}
              </Typography.Text>
            </Space>
            <Space align='start'>
              <Typography.Paragraph>
                Смена подтверждена:
              </Typography.Paragraph>
              <Typography.Text strong>
                {data?.approve_shift ? 'Да' : 'Нет'}
              </Typography.Text>
            </Space>
            <Space>
              <Button ghost type='primary' onClick={handleResetApprove}>
                Сбросить подтверждение
              </Button>
              <Button ghost type='primary' onClick={handleResetShift}>
                Сбросить смену
              </Button>
              {/* <Popconfirm
                title='Вы действительно хотите удалить пользователя?'
                description='Данное действие нельзя будет отменить!'
                okText='Да'
                okType='danger'
                cancelText='Нет'
              >
                <Button danger type='primary'>
                  Удалить пользователя
                </Button>
              </Popconfirm> */}
            </Space>
          </Space>
        </Card>
      </Space>
    </AdminPage>
  )
}

export default AdminUserProfile;