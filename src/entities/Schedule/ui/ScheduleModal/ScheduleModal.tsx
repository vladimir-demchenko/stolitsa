import { Modal } from 'antd';
import cls from './ScheduleModal.module.scss';
import { ItemType } from 'entities/Schedule/model/types';
import { classNames } from 'shared/lib/classNames';
import CollapseArrowUp from 'shared/assets/icons/collapseArrowUp.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface ScheduleModalProps {
  open: boolean;
  onCancel: (...args: unknown[]) => void;
  item?: ItemType;
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
    <Modal
      title=''
      open={open}
      onCancel={onCancel}
      footer={[]}
      closeIcon={false}
      width={900}
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
          {item?.tags?.map((tag, index) => (
            <span key={index} className={classNames(cls.tag, {}, [cls[getColor(index)]])}>{tag}</span>
          ))}
        </div>
        <Button theme={ButtonTheme.PURPLE} className={cls.modalButton}>Подать заявку</Button>
      </div>
    </Modal>
  )
}