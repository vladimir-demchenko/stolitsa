import { Form } from 'antd';
import cls from './FormPage.module.scss';
import { FirstStep, SecondStep } from 'features/FormStep';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/router';

export const FormPage = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState('1');
  const navigate = useNavigate();

  const content = useCallback((step: string) => {
    switch (step) {
      case '1':
        return <FirstStep />
      case '2': return <SecondStep />
      default: return <FirstStep />
    }
  }, [step])

  return (

    <div className={cls.container}>
      <div className={cls.content}>
        <div className={cls.titleWrapper}>
          <h2 className={cls.title}>Заполни анкету</h2>
          <span className={cls.highlighted}>
            шаг {step}
          </span>
        </div>
        <p className={cls.hint}>* обязательные к заполнению поля</p>
        <Form layout='vertical' form={form} name='form' onFinish={(values) => navigate(RoutePath.profile)}>
          {content(step)}
          {step === '1' ? <Button onClick={() => setStep('2')} className={cls.formButton} theme={ButtonTheme.GREEN}>Продолжить</Button> : <Button onClick={() => form.submit()} className={cls.formButton} theme={ButtonTheme.GREEN}>Сохранить</Button>}
        </Form>
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