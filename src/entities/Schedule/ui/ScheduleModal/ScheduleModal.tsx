import { ConfigProvider, Modal, message } from 'antd';
import cls from './ScheduleModal.module.scss';
import { ItemType } from 'entities/Schedule/model/types';
import { classNames } from 'shared/lib/classNames';
import CollapseArrowUp from 'shared/assets/icons/collapseArrowUp.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useMediaQuery } from 'react-responsive';
import { useUserShift } from 'entities/Schedule/model/scheduleApi';

interface ScheduleModalProps {
  open: boolean;
  onCancel: (...args: unknown[]) => void;
  item?: ItemType;
  setOpen?: any;
  selectCancel?: (...args: unknown[]) => void;
}

function getColor(index: number) {
  switch (index) {
    case 0: return 'purple';
    case 1: return 'orange';
    default: return 'green';
  }
}

export const ScheduleModal = ({ open, onCancel, item, setOpen, selectCancel }: ScheduleModalProps) => {
  const [userShift] = useUserShift();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const userId = localStorage.getItem('user');
  const [messageApi, contextHolder] = message.useMessage();

  const handleShift = () => {
    userShift({
      id: userId,
      shiftID: item?.id
    }).unwrap()
      .then(() => {
        const shiftID = localStorage.getItem('shiftID');
        if (shiftID) {
          localStorage.removeItem('shiftID');
        }
        message.success('Смена добавлена!');
        selectCancel?.();
        onCancel();
      })
      .catch((error) => {
        if (error.status === 401 || !userId) {
          localStorage.setItem('shiftID', item ? item.id : '');
          onCancel();
          setOpen(true);
        } else {
          message.error(error.data.message)
        }
      })
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Unbounded'
        }
      }}
    >
      {contextHolder}
      <Modal
        title=''
        open={open}
        onCancel={onCancel}
        footer={[]}
        closeIcon={false}
        width={isMobile ? 325 : 770}
      >
        <div className={cls.modal}>
          <p className={cls.date}>{item?.date}</p>
          <div className={cls.header}>
            <h3 className={cls.title}>{item?.title}</h3>
            <Button className={cls.collapseBtn} theme={ButtonTheme.CLEAR} onClick={onCancel}>
              <CollapseArrowUp />
            </Button>
          </div>
          {/* <span className={cls.first}>{item?.tags}</span> */}
          <div className={cls.tagsList}>
            {item?.descriptions?.map((description, index) => (
              <span key={index} className={classNames(cls.description, { [cls.first]: index === 0 })}>{description}</span>
            ))}
          </div>
          {item?.open_reg && <Button onClick={handleShift} theme={ButtonTheme.PURPLE} className={cls.modalButton}>Подать заявку</Button>}
          <p className={cls.expireTime}>Прием заявок до {dayjs(item?.expire_time).locale('ru').format('D MMMM')}</p>
        </div>
      </Modal>
    </ConfigProvider>
  )
}