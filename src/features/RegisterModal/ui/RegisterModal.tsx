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
import { useForgot, useLogin, useRegistration } from '../api/registerApi'
import { useCallback, useState } from 'react'

export const RegisterModal = ({ open, onCancel }: { open: boolean, onCancel: (...args: unknown[]) => void }) => {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState('login');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const content = useCallback(() => {
    switch (contentType) {
      case 'login':
        return <LoginLayout setContentType={setContentType} onCancel={onCancel} />
      case 'register':
        return <RegisterLayout setContentType={setContentType} onCancel={onCancel} />
      case 'forgot':
        return <ForgotLayout setContentType={setContentType} onCancel={onCancel} />
    }
  }, [contentType]);


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
        },
        components: {
          Form: {
            itemMarginBottom: 0
          }
        }
      }
      }
    >
      <Modal
        title=''
        open={open}
        onCancel={onCancel}
        footer={[]}
      >
        {content()}
      </Modal>
    </ConfigProvider>
  )
}

const LoginLayout = ({ onCancel, setContentType }: { onCancel: (...args: unknown[]) => void, setContentType: any }) => {
  const [login] = useLogin();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = (values: any) => {
    login(values)
      .unwrap()
      .then((res) => {
        localStorage.setItem('token', JSON?.stringify(res?.tokens));
        localStorage.setItem('role', res?.roles[0]?.name);
        localStorage.setItem('user', res.uid);
        onCancel();
        navigate(RoutePath.profile);
      })
      .catch((err) => {
        form.setFields([
          {
            name: 'login',
            errors: [err.data.message],
          },
          {
            name: 'password',
            errors: [err.data.message],
          },
        ]);
      });
  }
  return (
    <div className={cls.modal}>
      {contextHolder}
      <h2 className={cls.title}>Вход в личный кабинет</h2>
      <Form form={form} name='login' onFinish={handleFinish}>
        <div className={cls.form}>
          <div className={cls.inputWrapper}>
            <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }, {
              type: 'email',
              message: 'Поле заполнено некорректно!',
            }]} className={cls.item} required name='login'><Input placeholder='Электронная почта' /></Form.Item>
            <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }]} className={cls.item} required name='password'><Input.Password placeholder='Пароль' /></Form.Item>
          </div>

          <Form.Item noStyle >
            <Button type='submit' theme={ButtonTheme.ORANGE} className={cls.button}>Войти</Button>
          </Form.Item>
          <Form.Item noStyle className={cls.item}>
            <Button theme={ButtonTheme.BORDERED} onClick={() => setContentType('forgot')} className={cls.button}>Не помнишь пароль?</Button>
          </Form.Item>
          <p className={cls.subtext}>Нет личного кабинета? <Button onClick={() => setContentType('register')} className={cls.link} theme={ButtonTheme.LINK}>Зарегистрируйся!</Button></p>
        </div>
      </Form>
    </div>
  )
}

const RegisterLayout = ({ onCancel, setContentType }: { onCancel: (...args: unknown[]) => void, setContentType: any }) => {
  const [registration] = useRegistration();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
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
        setContentType('login');
        onCancel();
      })
      .catch((err) => {
        form.setFields([
          {
            name: 'button',
            errors: [err.data.message],
          }
        ]);
      });
  }
  return (
    <div className={cls.modal}>
      {contextHolder}
      <h2 className={cls.title}>Регистрация</h2>
      <Form form={form} name='register' onFinish={handleFinish}>
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
            <Form.Item rules={[{ required: true, message: 'Обязательное поле' }]} name='day' required>
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
            <Form.Item rules={[{ required: true, message: 'Обязательное поле' }]} name='month' required>
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
            <Form.Item rules={[{ required: true, message: 'Обязательное поле' }]} name='year' required>
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
          <Form.Item name='button' className={cls.item}><Button type='submit' theme={ButtonTheme.GREEN} className={cls.button}>Зарегистроваться</Button></Form.Item>
          <p className={cls.subtext}>Уже есть аккаунт? <Button onClick={() => setContentType('login')} className={cls.link} theme={ButtonTheme.LINK}>Войти!</Button></p>
        </div>
      </Form>
    </div>
  )
}

const ForgotLayout = ({ onCancel, setContentType }: { onCancel: (...args: unknown[]) => void, setContentType: any }) => {
  const [forgot] = useForgot();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (values: any) => {
    forgot({
      email: values.login,
    })
      .unwrap()
      .then((res) => {
        messageApi.success('Сообщение отправлено. Проверьте свой e-mail');
        setContentType('login');
      })
      .catch((err) => {
        form.setFields([
          {
            name: 'button',
            errors: [err.data.message],
          }
        ]);
      });
  }

  return (
    <div className={cls.modal}>
      {contextHolder}
      <h2 className={cls.forgotTitle}>Восстановить пароль</h2>
      <p className={cls.help}>Введите электронную почту, <br /> указанную при регистрации</p>
      <Form form={form} name='forgot' onFinish={handleFinish}>
        <div className={cls.form}>
          <Form.Item rules={[{ required: true, message: 'Обязательное поле для заполнения' }, {
            type: 'email',
            message: 'Поле заполнено некорректно!',
          }]} className={cls.item} required name='login'><Input placeholder='Электронная почта' /></Form.Item>

          <Form.Item name='button' className={cls.item}><Button type='submit' theme={ButtonTheme.BLUE} className={cls.button}>Восстановить пароль</Button></Form.Item>
          <p className={cls.subtext}>Уже есть аккаунт? <Button onClick={() => setContentType('login')} className={cls.link} theme={ButtonTheme.LINK}>Войти!</Button></p>
        </div>
      </Form>
    </div>
  )
}