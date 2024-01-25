import { ConfigProvider, Form, Input, Modal, message } from 'antd'
import cls from './RegisterModal.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router'
import { RoutePath } from 'shared/config/router'
import { useMediaQuery } from 'react-responsive'
import Select from 'react-select'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { daysOption, monthOptions, yearOptions } from '../model/const'
import { Checkbox } from 'shared/ui/Checkbox'
import Pdf from 'shared/assets/doc/Политика_конфиденциальности.pdf'
import { useRegistration } from '../api/registerApi'

export const RegisterModal = ({ open, onCancel }: { open: boolean, onCancel: (...args: unknown[]) => void }) => {
  const navigate = useNavigate();
  const [registration] = useRegistration();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [messageApi, contextHolder] = message.useMessage()

  const handleFinish = (values: any) => {
    console.log(values, dayjs(values.year.value + '-' + values.month.value + '-' + values.day.value));
    registration({
      lastname: values.name?.split(' ')[0],
      firstname: values.name?.split(' ')[1],
      secondname: values.name?.split(' ')[2],
      login: values.login,
      birthday: dayjs(values.year.value + '-' + values.month.value + '-' + values.day.value).toISOString()
    })
      .unwrap()
      .then((res) => {
        localStorage.setItem('token', JSON?.stringify(res?.tokens));
        messageApi.success('Регистрация прошла успешно!');
        onCancel();
      })
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Unbounded',
          borderRadius: 20,
          controlHeight: isMobile ? 30 : 46,
          colorBgContainer: '#EFFBFF',
          colorPrimaryHover: '#701487',
          colorPrimaryActive: '#701487',
          colorPrimary: '#701487'
        }
      }
      }
    >
      <Modal
        title=''
        open={open}
        onCancel={onCancel}
        footer={[]}
        width={567}
      >
        <div className={cls.modal}>
          {contextHolder}
          <h2 className={cls.title}>Регистрация</h2>
          <Form onFinish={handleFinish}>
            <div className={cls.form}>
              <div className={cls.inputWrapper}>
                <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }]} className={cls.item} required name='name'><Input placeholder='Фамилия Имя Отчество' /></Form.Item>
                <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }, {
                  type: 'email',
                  message: 'Поле заполнено некорректно!',
                }]} className={cls.item} required name='login'><Input placeholder='Электронная почта' /></Form.Item>
              </div>
              <h3 className={cls.labelSelect}>Дата рождения</h3>
              <div className={cls.selectWrapper}>
                <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }]} noStyle name='day' required>
                  <Select
                    components={{ IndicatorSeparator: null }}
                    options={daysOption}
                    placeholder='День'
                    styles={{
                      // @ts-ignore
                      menu: (base, props) => ({
                        ...base,
                        width: 'calc(100% + 25px)',
                      }),
                      // @ts-ignore
                      control: (base, state) => ({
                        ...base,
                        height: 40,
                        background: '#EFFBFF',
                        borderRadius: 20,
                        border: 0,
                        color: '#1B1C1E',
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#EFFBFF',
                        primary25: '#EFFBFF',
                      },
                    })}
                  />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }]} noStyle name='month' required>
                  <Select
                    components={{ IndicatorSeparator: null }}
                    options={monthOptions}
                    placeholder='Месяц'
                    styles={{
                      // @ts-ignore
                      menu: (base, props) => ({
                        ...base,
                        width: 'calc(100% + 25px)',
                      }),
                      // @ts-ignore
                      control: (base, state) => ({
                        ...base,
                        height: 40,
                        background: '#EFFBFF',
                        borderRadius: 20,
                        border: 0,
                        color: '#1B1C1E',
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#668569',
                        primary25: '#D0E1D2',
                      },
                    })}
                  />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }]} noStyle name='year' required>
                  <Select
                    components={{ IndicatorSeparator: null }}
                    options={yearOptions}
                    placeholder='Год'
                    styles={{
                      // @ts-ignore
                      menu: (base, props) => ({
                        ...base,
                        width: 'calc(100% + 25px)',
                      }),
                      // @ts-ignore
                      control: (base, state) => ({
                        ...base,
                        height: 40,
                        background: '#EFFBFF',
                        borderRadius: 20,
                        border: 0,
                        color: '#1B1C1E',
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#668569',
                        primary25: '#D0E1D2',
                      },
                    })}
                  />
                </Form.Item>
              </div>
              <Form.Item valuePropName='checked' name='agree' noStyle required>
                <Checkbox>Согласние на обработку <a className={cls.link} href={Pdf} target='_blank'>персональных данных</a></Checkbox>
              </Form.Item>
              <Form.Item noStyle className={cls.item}><Button type='submit' theme={ButtonTheme.GREEN} className={cls.button}>Зарегистроваться</Button></Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  )
}