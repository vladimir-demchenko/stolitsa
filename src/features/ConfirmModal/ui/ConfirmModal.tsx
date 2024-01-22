import { Modal } from 'antd';
import cls from './ConfirmModal.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useMediaQuery } from 'react-responsive';

interface ConfirmModalProps {
  open: boolean;
  onCancel: (...args: unknown[]) => void;
}

export const ConfirmModal = ({ open, onCancel }: ConfirmModalProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width={isMobile ? 300 : 567}
      footer={[]}
      closeIcon={false}
    >
      <div className={cls.modal}>
        <h3 className={cls.title}>Ты уверен, что хочешь отправить заявку?</h3>
        <p className={cls.subtext}>После подтверждения изменения вносить нельзя</p>
        <div className={cls.buttonWrapper}>
          <Button onClick={onCancel} className={cls.cancelBtn} theme={ButtonTheme.BORDERED}>Отменить</Button>
          <Button className={cls.confirmBtn}>Подтвердить</Button>
        </div>
      </div>
    </Modal>
  )
}