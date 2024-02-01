import { Form, message } from 'antd';
import cls from './FormPage.module.scss';
import { FirstStep, SecondStep } from 'features/FormStep';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/router';
import { Bg } from 'shared/ui/Bg/Bg';
import { useCurrent, useUpdateUsersInfo } from 'features/FormStep/api/stepApi';

export const FormPage = () => {
  const { data, isLoading } = useCurrent(null);
  const [step, setStep] = useState('1');
  const navigate = useNavigate();
  const [sex, setSex] = useState(data?.sex ?? 'мужской');
  const illnessInitialValue = data?.illness ? data?.illness === 'Нет' ? { illness: data?.illness, illnessValue: '' } : { illness: 'yes', illnessValue: data?.illness } : { illness: '', illnessValue: '' }
  const [check, setCheck] = useState(illnessInitialValue);
  const [updateInfo] = useUpdateUsersInfo();
  const id = localStorage.getItem('user');
  const [messageApi, contextHolder] = message.useMessage();

  const checkValue = useMemo(() => check, [check]);

  console.log(checkValue)

  const handleChange = (e: any) => {
    setCheck((prev) => ({ ...prev, illness: e.target?.value }))
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (check.illness === 'yes') {
      setCheck((prev) => ({ ...prev, illnessValue: e.target.value }))
    }
  }


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={'container'}>
      {contextHolder}
      <Bg />
      <div className={classNames(cls.content, {}, ['content'])}>
        <div className={cls.titleWrapper}>
          <h2 className={cls.title}>Заполни анкету</h2>
          <span className={cls.highlighted}>
            шаг {step}
          </span>
        </div>
        <p className={cls.hint}>* обязательные к заполнению поля</p>
        <Form.Provider onFormFinish={
          (name, { values, forms }) => {
            if (name === 'step1') {
              setStep('2');
            }

            if (name === 'step2') {
              if (data?.approve_shift) {
                navigate(RoutePath.profile)
              } else {
                const step1 = forms.step1.getFieldsValue();
                updateInfo({
                  id: id,
                  phone: step1.phone,
                  avatar_key: step1.avatar_key[0].originFileObj ? step1.avatar_key[0].originFileObj.uid : step1.avatar_key[0].uid,
                  citizenship: step1.citizenship ? 'Российская Федерация' : '',
                  sex: sex,
                  passport_number: parseInt(step1.passport_number),
                  passport_series: parseInt(step1.passport_series),
                  place_of_birth: step1.place_of_birth,
                  place_of_work: step1.place_of_work,
                  actual_living: step1.actual_living,
                  registration_living: step1.registration_living,
                  position: step1.position,
                  tg_name: step1.tg_name,
                  vk_link: step1.vk_link,
                  illness: check.illness === 'Нет' ? check.illness : check.illnessValue,
                  find_out: values.find_out,
                  future_skills: values.future_skills,
                  about_yourself: values.about_yourself,
                  take_part: values.take_part
                })
                  .then(() => {
                    messageApi.success('Данные успешно отправлены!')
                    navigate(RoutePath.profile)
                  })
              }
            }
          }
        }>
          <FirstStep disabled={data?.approve_shift} userData={data} formValues={sex} setFormValues={setSex} hidden={step === '2'} />
          <SecondStep disabled={data?.approve_shift} userData={data} check={checkValue} handleChange={handleChange} handleInput={handleInput} hidden={step === '1'} />
          {/* {step === '1' ?  : <Button onClick={() => form.submit()} className={cls.formButton} theme={ButtonTheme.GREEN}>Сохранить</Button>} */}
        </Form.Provider>
      </div>
      <svg className={classNames('curves', {}, [cls.greenCurve])} xmlns="http://www.w3.org/2000/svg" width="443" height="871" viewBox="0 0 443 871" fill="none">
        <path d="M467.001 763.001C-156 1125.5 233.5 355.5 120 399.001C-112.224 488.004 39.5006 104 450 10.5007" stroke="#ABC704" stroke-width="20" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.blueCurve])} xmlns="http://www.w3.org/2000/svg" width="495" height="996" viewBox="0 0 495 996" fill="none">
        <path d="M-20.5004 10.4998C411.999 29.4999 326 183 185 183C-318.735 183 89.4528 588.531 185 610.5C593.5 704.426 535.2 262.9 302 400.5C10.4995 572.5 170.5 692 185 878C199.5 1064 -77.4998 955 -302.5 938" stroke="#01B2E0" stroke-width="20" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.orangeCurve])} xmlns="http://www.w3.org/2000/svg" width="481" height="773" viewBox="0 0 481 773" fill="none">
        <path d="M505.001 763.001C409.454 741.032 -286.5 636 158 399.001C377.451 281.993 77.5004 104 488 10.5007" stroke="#FD7D32" stroke-width="20" stroke-linecap="round" />
      </svg>
    </div>
  )
}