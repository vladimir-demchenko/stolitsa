import { ConfigProvider, Form, Input, Modal } from 'antd'
import cls from './RegisterModal.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { isMobile } from 'react-device-detect'

export const RegisterModal = ({ open, onCancel }: { open: boolean, onCancel: (...args: unknown[]) => void }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Unbounded',
          borderRadius: 20,
          controlHeight: 46,
          colorBgContainer: '#EFFBFF'
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
          <Form>
            <Form.Item className={cls.item}><Input placeholder='Электронная почта' /></Form.Item>
            <Form.Item className={cls.item}><Input.Password placeholder='Пароль' /></Form.Item>
            <Form.Item className={cls.item}><Button type='submit' className={cls.button}>Войти</Button></Form.Item>
            <Form.Item className={cls.item}><Button theme={ButtonTheme.BORDERED} className={cls.button}>Забыли пароль?</Button></Form.Item>
          </Form>
          <p className={cls.subtext}>Нет личного кабинета? <a className={cls.link}>Зарегистрируйтесь!</a></p>
        </div>
      </Modal>
    </ConfigProvider>
  )
}