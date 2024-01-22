import FlowerLogo from 'shared/assets/icons/flower_logo.svg';
import cls from './PersonalPage.module.scss';
import mockUser from 'shared/assets/img/mockUser.png';
import { Footer } from 'widgets/Footer';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames';
import { SelectedShift } from 'entities/Shift';
import dayjs from 'dayjs';
import { useState } from 'react';
import { SelectShift } from 'features/SelectShift/ui/SelectShift';
import { ConfirmModal } from 'features/ConfirmModal';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/router';
import Pdf from 'shared/assets/doc/памятка 2024 .pdf';

const mockFirstname = 'Андрей';
const mockLastname = 'Иванов';
const age = 27;
const email = 'pochta@gmail.com'
const mockSelected = true;
const expireTime = '2023-05-20';

const mockShift = {
  date: '29 июня—2 июля',
  title: 'Объединяй',
  tags: 'лидеры молодёжных сообществ',
  descriptions: ['Лидеры молодёжных сообществ', 'Реализовывать идеи', 'Объединять единомышленников', 'Обмениваться опытом'],
  expireTime: '2023-05-20'
}

export const PersonalPage = () => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const onCancel = () => {
    setOpen(false);
  }

  const onCancelConfirm = () => {
    setConfirm(false);
  }

  const handlePreviewCertificate = () => {
    const pdfPreviewWindow = window.open();
    if (pdfPreviewWindow) {
      pdfPreviewWindow.location.href = Pdf;
    }
  };

  return (
    <>
      <div className={cls.header}>
        <FlowerLogo className={cls.logo} />
        <p className={cls.helloText}>Привет, {mockFirstname}!</p>
      </div>
      <div className={cls.personal}>
        <div className={cls.container}>
          <div className={classNames(cls.card, {}, [cls.personalCard])}>
            <div className={cls.avatar}>
              <img className={cls.avatarImg} alt='avatar' src={mockUser} />
            </div>
            <div className={cls.personalInfo}>
              <p className={cls.infoName}>{mockFirstname} {mockLastname}</p>
              <div className={cls.personalInfoAdditional}>
                <p className={cls.infoText}>{age} лет</p>
                <p className={cls.infoText}>{email}</p>
              </div>
            </div>
          </div>
          <div className={classNames(cls.card, {}, [cls.shiftCard])}>
            <div className={cls.headerCard}>
              <h2 className={cls.titleCard}>Смена</h2>
              {mockSelected && <Button onClick={() => setOpen(true)} className={cls.changeButton} theme={ButtonTheme.GREEN}>Изменить смену</Button>}
            </div>
            {!mockSelected && <Button onClick={() => setOpen(true)} className={cls.contentButton} theme={ButtonTheme.GREEN}>Выбрать смену</Button>}
            {mockSelected && <SelectedShift item={mockShift} />}
          </div>
          <div className={classNames(cls.card, {}, [cls.aboutCard])}>
            <h2 className={cls.titleCard}>Обо мне</h2>
            <Button onClick={() => navigate(RoutePath.form)} theme={ButtonTheme.BLUE} className={cls.contentButton}>Заполнить информацию о себе</Button>
          </div>
          <div className={classNames(cls.card, {}, [cls.creativeCard])}>
            <h2 className={cls.titleCard}>Творческое задание</h2>
            <Button onClick={() => navigate(RoutePath.creative_task)} className={cls.contentButton}>Выполнить творческое задание</Button>
          </div>
          <div className={classNames(cls.card, {}, [cls.reminderCard])}>
            <p className={cls.reminderText}>Для того, чтобы твоя смена прошла комфортно, предлагаем ознакомиться с памяткой участника:</p>
            <Button onClick={handlePreviewCertificate} theme={ButtonTheme.INVERT_BLUE} className={cls.contentButton}>Памятка участника</Button>
          </div>
        </div>
        {mockSelected &&
          <div className={cls.confirmShift}>
            <h2 className={cls.title}>Подача заявки <span className={cls.highlighted}>до {dayjs(expireTime).locale('ru').format('D MMMM')}</span></h2>
            <Button onClick={() => setConfirm(true)} className={cls.confirmButton} theme={ButtonTheme.PURPLE}>Отправить заявку</Button>
            <p className={cls.subtext}>После подтверждения изменения вносить нельзя</p>
          </div>}
        <SelectShift open={open} onCancel={onCancel} />
        <ConfirmModal open={confirm} onCancel={onCancelConfirm} />
      </div>
      <Footer />
    </>
  )
}