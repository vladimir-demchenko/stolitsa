import { ConfigProvider, Modal } from 'antd';
import cls from './ScheduleModal.module.scss';
import { ItemType } from 'entities/Schedule/model/types';
import { classNames } from 'shared/lib/classNames';
import CollapseArrowUp from 'shared/assets/icons/collapseArrowUp.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface ScheduleModalProps {
  open: boolean;
  onCancel: (...args: unknown[]) => void;
  item?: Omit<ItemType, 'tags'>;
}

function getColor(index: number) {
  switch (index) {
    case 0: return 'purple';
    case 1: return 'orange';
    default: return 'green';
  }
}

export const ScheduleModal = ({ open, onCancel, item }: ScheduleModalProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Unbounded'
        }
      }}
    >
      <Modal
        title=''
        open={open}
        onCancel={onCancel}
        footer={[]}
        closeIcon={false}
        width={770}
      >
        <div className={cls.modal}>
          <p className={cls.date}>{item?.date}</p>
          <div className={cls.header}>
            <h3 className={cls.title}>{item?.title}</h3>
            <Button theme={ButtonTheme.CLEAR} onClick={onCancel}>
              <CollapseArrowUp />
            </Button>
          </div>
          <div className={cls.tagsList}>
            {item?.descriptions?.map((tag, index) => (
              <span className={classNames(cls.tag, { [cls.first]: index === 0 })}>{tag}</span>
            ))}
          </div>
          <Button theme={ButtonTheme.PURPLE} className={cls.modalButton}>Подать заявку</Button>
          <p className={cls.expireTime}>Прием подачи заявок до {dayjs(item?.expireTime).locale('ru').format('D MMMM')}</p>
        </div>
      </Modal>
    </ConfigProvider>
  )
}