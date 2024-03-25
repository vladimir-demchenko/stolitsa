import { classNames } from 'shared/lib/classNames';
import cls from './CreativeTask.module.scss';
import { Form, message } from 'antd';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/router';
import { Bg } from 'shared/ui/Bg/Bg';
import { useCreativeTask } from '../api/creativeApi';
import { useCurrent } from 'features/FormStep/api/stepApi';

const CreativeTask = () => {
  const [creativeTask] = useCreativeTask();
  const { data, isLoading } = useCurrent(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const id = localStorage.getItem('user');
  const [messageApi, contextHolder] = message.useMessage();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='app'>
      <div className={'container'}>
        {contextHolder}
        <Bg />
        <div className={classNames(cls.content, {}, ['content'])}>
          <h2 className={cls.title}>Выполни задание</h2>
          <div className={cls.cardList}>
            <div className={cls.card}>
              <p className={cls.boldText}>Для подачи заявки тебе необходимо выполнить творческое задание — <span className={cls.highlighted}>снять презентационный ролик</span></p>
            </div>
            <div className={cls.card}>
              <h3 className={cls.subtitle}>В ролике тебе необходимо ответить на три вопроса:</h3>
              <ul className={cls.questionList}>
                <li><p className={cls.questionText}><span className={classNames(cls.questionNumber, {}, [cls.green])}>1.</span>Какие, на твой взгляд, возможности для молодёжи открывает Москва?</p></li>
                <li><p className={cls.questionText}><span className={classNames(cls.questionNumber, {}, [cls.orange])}>2.</span>Почему я выбрал именно эту смену?</p></li>
                <li><p className={cls.questionText}><span className={classNames(cls.questionNumber, {}, [cls.cyan])}>3.</span>Что делает меня счастливым?</p></li>
              </ul>
              <p className={cls.subtext}>Приветствуется креативный подход в съемке ролика.</p>
            </div>
            <div className={cls.card}>
              <p className={cls.detailText}>Ролик должен быть опубликован на личной странице в социальной сети ВКонтакте. Не забудь указать хештеги <br /><span className={cls.bold}>#STOлица_Лето</span>
                <br /><span className={cls.bold}>#Москва_молодёжная_столица_России</span>
                <br />и убедиться, что твоя страница открыта</p>
            </div>
            <div className={cls.card}>
              <Form disabled={data?.approve_shift} form={form} name='creative' onFinish={(values) => {
                if (data?.approve_shift) {
                  navigate(RoutePath.profile);
                } else {
                  creativeTask({
                    id: id,
                    creative_task: values.link
                  })
                    .then(() => {
                      messageApi.success('Ссылка добавлена!');
                      navigate(RoutePath.profile);
                    })
                }
              }}>
                <div className={cls.formItem}>
                  <label className={cls.formLabel}>Добавь ссылку на видео</label>
                  <Form.Item rules={[{ pattern: /\b(?:http:\/\/|ftp:\/\/)?(?:m\.)?(?:vk\.ru|vk\.com)\/?/, message: 'Поле заполнено некорректно' }]} initialValue={data?.creative_task} required name='link'>
                    <Input className={cls.input} placeholder='vk.com/video' />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <Button onClick={() => form.submit()} className={cls.formButton} theme={ButtonTheme.GREEN}>{data?.approve_shift ? 'Личный кабинет' : 'Сохранить'}</Button>
        </div>
        <svg className={classNames('curves', {}, [cls.greenCurve])} xmlns="http://www.w3.org/2000/svg" width="350" height="1105" viewBox="0 0 350 1105" fill="none">
          <path d="M424.515 260C434.466 286.405 200.183 -119.357 65.0154 52.9999C-123.984 294 625.256 553.092 498.015 497C322.21 419.5 -209.985 457.5 111.516 709C389.032 926.092 52.8845 1157 440.516 1079.5" stroke="#ABC704" stroke-width="20" stroke-linecap="round" />
        </svg>
        <svg className={classNames('curves', {}, [cls.cyanCurve])} xmlns="http://www.w3.org/2000/svg" width="455" height="1170" viewBox="0 0 455 1170" fill="none">
          <path d="M-19.0008 21.4999C-9.0504 47.9051 236.918 -67.7947 339 126C524.943 479 433.741 701.092 306.5 645C130.695 567.5 -249.943 610.5 71.5575 862C349.073 1079.09 281.5 1098 -19.0008 1159.5" stroke="#01B2E0" stroke-width="20" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  )
}

export default CreativeTask;