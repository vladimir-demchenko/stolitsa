import { ConfigProvider, Form, Upload } from 'antd';
import cls from './SecondStep.module.scss';
import { RadioButton } from 'shared/ui/RadioButton';
import { Input } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import UploadIcon from 'shared/assets/icons/upload.svg';

import { Checkbox } from 'shared/ui/Checkbox';
import { ChangeEvent, useState } from 'react';

export const SecondStep = ({ userData, check, handleChange, handleInput, hidden, disabled }: any) => {
  // const [check, setCheck] = useState({ illness: '', illnessValue: '' });

  // const handleChange = (e: any) => {
  //   setCheck((prev) => ({ ...prev, illness: e.target?.value }))
  // }

  // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (check.illness === 'yes') {
  //     setCheck((prev) => ({ ...prev, illnessValue: e.target.value }))
  //   }
  // }

  return (
    <Form disabled={disabled} layout='vertical' name='step2' hidden={hidden} initialValues={userData}>
      <div className={cls.secondStep}>
        <Form.Item noStyle required>
          <div className={cls.formItem}>
            <div className={cls.itemHeader}>
              <label className={cls.formLabel}>Имеются ли у тебя хронические заболевания или иные медицинские противопоказания?</label>
            </div>
            <div className={cls.checkboxWrapper}>
              <Checkbox onChange={handleChange} checked={check.illness === 'Нет'} name='illness' value='Нет'>Нет</Checkbox>
              <Checkbox onChange={handleChange} checked={check.illness === 'yes'} name='illness' value='yes'><Input onChange={handleInput} value={check.illnessValue} className={cls.innerInput} placeholder='Если да, то перечисли' /></Checkbox>
            </div>
          </div>
        </Form.Item>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Откуда ты узнал о нашем слёте?</label>
          </div>
          <Form.Item noStyle required name='find_out'>
            <Input.Textarea rows={5} placeholder='Добавь текст' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Какие навыки ты бы хотел получить, посетив наш слёт?</label>
          </div>
          <Form.Item noStyle required name='future_skills'>
            <Input.Textarea rows={5} placeholder='Добавь текст' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Расскажи немного о себе</label>
          </div>
          <Form.Item noStyle required name='about_yourself'>
            <Input.Textarea rows={5} placeholder='Напиши свои увлечения, хобби, реализованные проекты, участие в разных мероприятиях и др.' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Напиши почему ты хочешь принять участие в слёте</label>
          </div>
          <Form.Item noStyle required name='take_part'>
            <Input.Textarea rows={5} placeholder='Новые знакомства, новые знания, отдохнуть и т.д.' />
          </Form.Item>
        </div>
      </div>
      <Form.Item>
        <Button type='submit' className={cls.formButton} theme={ButtonTheme.GREEN}>{disabled ? 'Личный кабинет' : 'Сохранить'}</Button>
      </Form.Item>
    </Form>
  )
}