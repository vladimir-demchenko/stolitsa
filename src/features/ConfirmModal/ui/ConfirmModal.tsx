import { Modal, message } from 'antd';
import cls from './ConfirmModal.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useMediaQuery } from 'react-responsive';
import { useConfirmShift } from '../api/confirmApi';

interface ConfirmModalProps {
  open: boolean;
  onCancel: (...args: unknown[]) => void;
  allow: boolean;
}

export const ConfirmModal = ({ open, onCancel, allow }: ConfirmModalProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const id = localStorage.getItem('user');
  const [confirmShift] = useConfirmShift();
  const [messageApi, contextHolder] = message.useMessage();

  const handleConfirm = () => {
    if (allow) {
      confirmShift({
        id: id,
        approve_shift: true
      })
        .unwrap()
        .then(() => {
          messageApi.success('Смена подтверждена!');
          onCancel();
        })
    } else {
      messageApi.error('Не все данные заполнены!')
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width={isMobile ? 300 : 567}
      footer={[]}
      closeIcon={false}
    >
      {contextHolder}
      <div className={cls.modal}>
        <h3 className={cls.title}>Ты уверен, что хочешь отправить заявку?</h3>
        <p className={cls.subtext}>После подтверждения изменения вносить нельзя</p>
        <div className={cls.buttonWrapper}>
          <Button onClick={onCancel} className={cls.cancelBtn} theme={ButtonTheme.BORDERED}>Отменить</Button>
          <Button onClick={handleConfirm} className={cls.confirmBtn}>Подтвердить</Button>
        </div>
      </div>
    </Modal>
  )
}