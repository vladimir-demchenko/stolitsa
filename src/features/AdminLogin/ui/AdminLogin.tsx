import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/router';

import { useLogin } from '../api/loginRequest';

import cls from './LoginForm.module.scss';

export function AdminLogin() {
  const navigate = useNavigate();
  const [login] = useLogin();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    login(values)
      .unwrap()
      .then((result) => {
        console.log(result)
        if (result?.tokens) {
          localStorage.setItem('token', JSON?.stringify(result?.tokens));
        }
        localStorage.setItem('role', result?.roles[0]?.name);
        if (result.confirmed) {
          localStorage.setItem('user', result.uid);
          navigate('/main');
        } else {
          navigate('/approve', { state: { userId: result.uid } });
        }
      })
      .catch((err) => {
        console.log(err)
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
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <Form
      form={form}
      name="login"
      className={cls.loginForm}
      layout="vertical"
      autoComplete="off"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="login"
        rules={[{ message: 'Пожалуйста введите e-mail!' }]}
      >
        <Input placeholder="E-mail" className={cls.loginInput} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ message: 'Пожалуйста введите пароль!' }]}
      >
        <Input.Password placeholder="Пароль" className={cls.loginInput} />
      </Form.Item>
      <Form.Item>
        <Button className={cls.submitButton} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
}
