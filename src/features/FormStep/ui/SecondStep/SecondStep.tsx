import { ConfigProvider, Form, Upload } from 'antd';
import cls from './SecondStep.module.scss';
import { RadioButton } from 'shared/ui/RadioButton';
import { Input } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import UploadIcon from 'shared/assets/icons/upload.svg';

import { Checkbox } from 'shared/ui/Checkbox';

export const SecondStep = () => {
  return (
    <div className={cls.secondStep}>
      <Form.Item noStyle required name='bol'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Имеются ли у тебя хронические заболевания или иные медицинские противопоказания?</label>
          </div>
          <div className={cls.checkboxWrapper}>
            <Checkbox value='net'>Нет</Checkbox>
            <Checkbox value='da'><Input className={cls.innerInput} placeholder='Если да, то перечисли' /></Checkbox>
          </div>
        </div>
      </Form.Item>
      <Form.Item noStyle required name='otkyda'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Откуда ты узнал о нашем слёте?</label>
          </div>
          <Input.Textarea rows={5} placeholder='Добавь текст' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='nav'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Какие навыки ты бы хотел получить, посетив наш слёт?</label>
          </div>
          <Input.Textarea rows={5} placeholder='Добавь текст' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='sebe'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Расскажи немного о себе</label>
          </div>
          <Input.Textarea rows={5} placeholder='Напиши свои увлечения, хобби, реализованные проекты, участие в разных мероприятиях и др.' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='poch'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Напиши почему ты хочешь принять участиев слёте</label>
          </div>
          <Input.Textarea rows={5} placeholder='Новые знакомства, новые знания, отдохнуть и т.д.' />
        </div>
      </Form.Item>
    </div>
  )
}