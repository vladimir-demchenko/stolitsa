import { ConfigProvider, Form, Upload } from 'antd';
import cls from './FirstStep.module.scss';
import { RadioButton } from 'shared/ui/RadioButton';
import { Input } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import UploadIcon from 'shared/assets/icons/upload.svg';
import { MaskedInput } from 'antd-mask-input';
import './Upload.scss';
import { Checkbox } from 'shared/ui/Checkbox';
import { useMediaQuery } from 'react-responsive';
import { useMemo, useState } from 'react';
import { useDownloadFiles, useUploadFiles } from 'features/FormStep/api/stepApi';
import { InputStatus } from 'antd/lib/_util/statusUtils';

export const FirstStep = ({ userData, formValues, setFormValues, hidden, disabled }: any) => {
  const [fileKey, setFileKey] = useState<string>(userData?.avatar_key ? userData?.avatar_key : null);
  const [uploadFiles] = useUploadFiles();
  const { data } = useDownloadFiles(fileKey, { skip: !fileKey });
  const [test, setTest] = useState('мужской');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [form] = Form.useForm();

  const avatar = Form.useWatch('avatar_key', form)

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const blobUrl = useMemo(
    () => {
      if (!data) {
        return null;
      }

      return window.URL.createObjectURL(new Blob([data]))
    },
    [data]
  );

  const uploadData = (options: any) => {
    const { file, onSuccess, onError } = options;

    const fmData = new FormData();
    fmData.append('image', file);
    console.log(options);
    console.log(fmData);
    uploadFiles(fmData)
      .unwrap()
      .then((result) => {
        file.uid = result.key;
        // form.setFieldValue('avatar_key', result.key);
        setFileKey(result.key);
        // alert('ok');
        onSuccess('Ok');
      })
      .catch((err) => {
        console.log(err)
        onError(err)
      });
    onSuccess('Ok');
    return {
      abort() {
        console.log('upload progress is aborted!');
      },
    };
  };

  // console.log(form.getFieldsError().filter((i) => i.name.includes('passport_number'))[0].errors);

  const getInitialValues = (userData: any) => ({
    ...userData,
    avatar_key: userData?.avatar_key ? [
      {
        uid: userData?.avatar_key,
        name: userData?.avatar_key,
        status: 'done',
      },
    ]
      : [],
    passport_number: userData?.passport_number ? `${userData?.passport_number}` : null,
    passport_series: userData?.passport_series ? `${userData?.passport_series}` : null,
    place_of_birth: userData?.place_of_birth,
    citizenship: userData?.citizenship ? true : false,
    vk_link: userData?.vk_link,
  })


  return (
    <Form form={form} disabled={disabled} layout='vertical' name='step1' hidden={hidden} initialValues={getInitialValues(userData)}>
      <div className={cls.firstStep}>
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
              <Form.Item rules={[
                {
                  required: true,
                  message: 'Обязательное поле',
                },
              ]} valuePropName='filleList' getValueFromEvent={normFile} required name='avatar_key'>
                <Upload
                  name="avatar"
                  accept='.png, .jpg, .jpeg'
                  maxCount={1}
                  showUploadList={false}
                  capture='environment'
                  customRequest={uploadData}
                  onChange={(info) => console.log(info)}
                  className={cls.upload}
                >
                  {blobUrl ? <img src={blobUrl} alt='avatar' style={{ width: '100%' }} /> : (<Button theme={ButtonTheme.CLEAR}>
                    <UploadIcon className='upload-icon' />
                  </Button>)}
                </Upload>
              </Form.Item>
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
        <Form.Item noStyle required>
          <div className={cls.formItem}>
            <label className={cls.formLabel}>Выбери пол</label>
            <RadioButton disabled={disabled} name='sex' value={formValues} onChange={(event) => setFormValues(event.target.value)} options={[{ value: 'мужской', content: 'мужской' }, { value: 'женский', content: 'женский' }]} />
          </div>
        </Form.Item>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Гражданство</label>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='citizenship' valuePropName='checked'>
            <Checkbox disabled={disabled} value={'Российская Федерация'}>Российская Федерация</Checkbox>
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <label className={cls.formLabel}>Паспорт</label>
          <div className={cls.inputsWrapper}>
            <div className={cls.inputWrapper}>
              <span className={cls.labelForInput}>серия</span>
              <Form.Item rules={[
                {
                  required: true,
                  message: 'Обязательное поле',
                },
                {
                  min: 4,
                  message: 'Неверно заполнено поле'
                }
              ]} required name='passport_series'>
                <Test disabled={disabled} maskOptions={{ placeholderChar: '#', maxLength: 4, lazy: true, autoFix: true }} mask={'0000'} placeholder='1234' />
              </Form.Item>
            </div>
            <div className={cls.inputWrapper}>
              <span className={cls.labelForInput}>номер</span>
              <Form.Item rules={[
                {
                  required: true,
                  message: 'Обязательное поле',
                },
              ]} required name='passport_number'>
                <Test disabled={disabled} maskOptions={{ placeholderChar: '#', lazy: true, autofix: true }} mask={'000000'} placeholder='123456' />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место рождения</label>
            <p className={cls.help}>как в паспорте</p>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='place_of_birth'>
            <Input placeholder='Введи адрес' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место проживания</label>
            <p className={cls.help}>фактическое</p>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='actual_living'>
            <Input placeholder='Введи адрес' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место проживания</label>
            <p className={cls.help}>по прописке</p>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='registration_living'>
            <Input placeholder='Введи адрес' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Место учёбы/работы</label>
            <p className={cls.help}>полное наименование учебного заведения или организации</p>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='place_of_work'>
            <Input placeholder='Введи название' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Занимаемая должность</label>
            <p className={cls.help}>если ты указал учебное заведение, можешь написать «студент»</p>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='position'>
            <Input placeholder='Введи должность' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Номер телефона</label>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='phone'>
            <Test disabled={disabled} className={cls.maskedInput} maskOptions={{ placeholderChar: '#', lazy: true, autofix: true }} mask={'{+7} (000) 000-00-00'} placeholder='+7 (000) 000-00-00' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Никнейм в Telegram</label>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='tg_name'>
            <Test disabled={disabled} className={cls.maskedInput} maskOptions={{ placeholderChar: '#', lazy: true, autofix: true }} mask={'{@}[******************************************]'} placeholder='@ name' />
          </Form.Item>
        </div>
        <div className={cls.formItem}>
          <div className={cls.itemHeader}>
            <label className={cls.formLabel}>Ссылка на страницу Вконтакте</label>
          </div>
          <Form.Item rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]} required name='vk_link'>
            <Input placeholder='vk.com/ name' />
          </Form.Item>
        </div>
      </div>
      {/* <Form.ErrorList errors={} /> */}
      <Form.Item>
        <Button type='submit' className={cls.formButton} theme={ButtonTheme.GREEN}>Продолжить</Button>

      </Form.Item>
    </Form>
  )
}

const Test = ({ value, onChange, disabled, ...otherProp }: any) => {
  const { status, errors } = Form.Item.useStatus();
  return (
    <MaskedInput status={status as InputStatus} value={value} onChange={onChange} disabled={disabled} className={cls.maskedInput} {...otherProp} />
  )
}