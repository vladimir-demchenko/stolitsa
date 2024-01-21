import { ConfigProvider, Form, Input, Modal } from 'antd'
import cls from './RegisterModal.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router'
import { RoutePath } from 'shared/config/router'

export const RegisterModal = ({ open, onCancel }: { open: boolean, onCancel: (...args: unknown[]) => void }) => {
  const navigate = useNavigate();

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
          <h2 className={cls.title}>Вход в личный кабинет</h2>
          <Form onFinish={() => navigate(RoutePath.profile)}>
            <div className={cls.form}>
              <div className={cls.inputWrapper}>
                <Form.Item noStyle className={cls.item}><Input placeholder='Электронная почта' /></Form.Item>
                <Form.Item noStyle className={cls.item}><Input.Password placeholder='Пароль' /></Form.Item>
              </div>
              <Form.Item noStyle className={cls.item}><Button type='submit' className={cls.button}>Войти</Button></Form.Item>
              <Form.Item noStyle className={cls.item}><Button theme={ButtonTheme.BORDERED} className={cls.button}>Забыл пароль?</Button></Form.Item>
              <p className={cls.subtext}>Нет личного кабинета? <a className={cls.link}>Зарегистрируйся!</a></p>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  )
}