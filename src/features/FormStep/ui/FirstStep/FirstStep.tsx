import { ConfigProvider, Form, Upload } from 'antd';
import cls from './FirstStep.module.scss';
import { RadioButton } from 'shared/ui/RadioButton';
import { Input } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import UploadIcon from 'shared/assets/icons/upload.svg';

import './Upload.scss';
import { Checkbox } from 'shared/ui/Checkbox';
import { useMediaQuery } from 'react-responsive';

export const FirstStep = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className={cls.firstStep}>
      <Form.Item noStyle required>
        <div className={classNames(cls.firstBlock, {}, [cls.formItem])}>
          <div>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'unbounded',
                  borderRadius: 20,
                  colorPrimaryHover: '#701487',
                  colorPrimaryActive: '#701487',
                  colorPrimary: '#701487'
                },
              }}
            >
              <Upload
                name="avatar"
                listType='picture-card'
                showUploadList={false}
                className={cls.upload}
              >
                <Button theme={ButtonTheme.CLEAR}>
                  <UploadIcon className='upload-icon' />
                </Button>
              </Upload>
            </ConfigProvider>
          </div>
          <div className={cls.itemDesc}>
            <label className={cls.formLabel}>Загрузи фото</label>
            <ul className={cls.itemList}>
              <li className={cls.itemList_item}><p className={cls.itemList_text}>размером не более 25Мб;</p></li>
              <li className={cls.itemList_item}><p className={cls.itemList_text}>белый или однотонный фон;</p></li>
              <li className={cls.itemList_item}><p className={cls.itemList_text}>разрешение фотографии не более 300*400 пикселей;</p></li>
              <li className={cls.itemList_item}><p className={cls.itemList_text}>формат jpg или png.</p></li>
            </ul>
          </div>
        </div>
      </Form.Item>
      <Form.Item noStyle required name='pol'>
        <div className={cls.formItem}>
          <label className={cls.formLabel}>Выбери пол</label>
          <RadioButton options={[{ value: 'мужской', content: 'мужской' }, { value: 'женский', content: 'женский' }]} />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='gr'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Гражданство</label>
          </div>
          <Checkbox value={'1'}>Российская Федерация</Checkbox>
        </div>
      </Form.Item>
      <div className={cls.formItem}>
        <label className={cls.formLabel}>Паспорт</label>
        <div className={cls.inputsWrapper}>
          <Form.Item noStyle required name='seria'>
            <div className={cls.inputWrapper}>
              <span className={cls.labelForInput}>серия</span>
              <Input placeholder={isMobile ? 'серия' : '1234'} />
            </div>
          </Form.Item>
          <Form.Item noStyle required name='nomer'>
            <div className={cls.inputWrapper}>
              <span className={cls.labelForInput}>номер</span>
              <Input placeholder={isMobile ? 'номер' : '123456'} />
            </div>
          </Form.Item>
        </div>
      </div>
      <Form.Item noStyle required name='mesto'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место рождения</label>
            <p className={cls.help}>как в паспорте</p>
          </div>
          <Input placeholder='Введи адрес' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='fac_liv'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место проживания</label>
            <p className={cls.help}>фактическое</p>
          </div>
          <Input placeholder='Введи адрес' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='liv'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место проживания</label>
            <p className={cls.help}>по прописке</p>
          </div>
          <Input placeholder='Введи адрес' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='stud'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место учёбы/работы</label>
            <p className={cls.help}>полное наименование учебного заведения или организации</p>
          </div>
          <Input placeholder='Введи название' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='gde'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Занимаемая должность</label>
            <p className={cls.help}>если ты указал учебное заведение, можешь написать «студент»</p>
          </div>
          <Input placeholder='Введи должность' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='num'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Номер телефона</label>
          </div>
          <Input placeholder='+7 (000) 000-00-00' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='tg'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Никнейм в Telegram</label>
          </div>
          <Input placeholder='@ name' />
        </div>
      </Form.Item>
      <Form.Item noStyle required name='vk'>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Ссылка на страницу Вконтакте</label>
          </div>
          <Input placeholder='vk.com/ name' />
        </div>
      </Form.Item>
    </div>
  )
}