import FlowerLogo from 'shared/assets/icons/flower_logo.svg';
import cls from './PersonalPage.module.scss';
import avatarPlaceholder from 'shared/assets/img/avatar-placeholder.png';
import { Footer } from 'widgets/Footer';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames';
import { SelectedShift } from 'entities/Shift';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useMemo, useState } from 'react';
import { SelectShift } from 'features/SelectShift/ui/SelectShift';
import { ConfirmModal } from 'features/ConfirmModal';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/router';
import Pdf from 'shared/assets/doc/памятка 2024 .pdf';
import { useCurrent } from '../api/personalApi';
import { useDownloadFiles } from 'features/FormStep/api/stepApi';

dayjs.extend(duration);
const mockFirstname = 'Андрей';
const mockLastname = 'Иванов';
// const age = 27;
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

function getSuffix(year: number) {
  switch (year % 10) {
    case 1:
      return 'год';
    case 2:
    case 3:
    case 4:
      return 'года';
    default:
      return 'лет'
  }
}

export const PersonalPage = () => {
  const { data, isLoading } = useCurrent(null);
  const { data: fileData } = useDownloadFiles(data?.avatar_key, { skip: !data?.avatar_key });
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const age = useMemo(() => {
    return dayjs().diff(dayjs(data?.birthday), 'year')
  }, [data])

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

  const blobUrl = useMemo(
    () => {
      if (!fileData) {
        return null;
      }

      return window.URL.createObjectURL(new Blob([fileData]))
    },
    [fileData]
  );

  const allow = useMemo(() => {
    if (!data) {
      return false;
    }

    const { firstname, secondname, lastname, ...dataWithoutName } = data

    return Object?.values(dataWithoutName)?.includes(null)
  }, [data]);


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={cls.header}>
        <Button theme={ButtonTheme.CLEAR} className={cls.mainPageButton} onClick={() => navigate(RoutePath.main)}>
          <FlowerLogo className={cls.logo} />
        </Button>
        <p className={cls.helloText}>Привет, {data?.firstname}!</p>
      </div>
      <div className={cls.personal}>
        <div className={cls.container}>
          <div className={classNames(cls.card, {}, [cls.personalCard])}>
            <div className={cls.avatar}>
              <img className={cls.avatarImg} alt='avatar' src={blobUrl ? blobUrl : avatarPlaceholder} />
            </div>
            <div className={cls.personalInfo}>
              <p className={cls.infoName}>{data?.firstname} {data?.lastname}</p>
              <div className={cls.personalInfoAdditional}>
                <p className={cls.infoText}>{age} {getSuffix(age)}</p>
                <p className={cls.infoText}>{data?.login}</p>
              </div>
            </div>
          </div>
          <div className={classNames(cls.card, {}, [cls.shiftCard])}>
            <div className={cls.headerCard}>
              <h2 className={cls.titleCard}>Смена</h2>
              {data?.shift && !data.approve_shift && <Button onClick={() => setOpen(true)} className={cls.changeButton} theme={ButtonTheme.GREEN}>Изменить смену</Button>}
            </div>
            {!data?.shift && <Button onClick={() => setOpen(true)} className={cls.contentButton} theme={ButtonTheme.GREEN}>Выбрать смену</Button>}
            {data?.shift && <SelectedShift item={data?.shift} />}
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
        {data?.shift && !data?.approve_shift &&
          <div className={cls.confirmShift}>
            <h2 className={cls.title}>Подача заявки <span className={cls.highlighted}>до {dayjs(data?.shift.expire_time).locale('ru').format('D MMMM')}</span></h2>
            <Button onClick={() => setConfirm(true)} className={cls.confirmButton} theme={ButtonTheme.PURPLE}>Отправить заявку</Button>
            <p className={cls.subtext}>После подтверждения изменения вносить нельзя</p>
          </div>}
        <SelectShift open={open} onCancel={onCancel} />
        <ConfirmModal allow={!allow} open={confirm} onCancel={onCancelConfirm} />
      </div>
      <Footer />
    </>
  )
}