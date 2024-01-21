import { Modal } from 'antd';
import cls from './SelectShift.module.scss';
import { BlockType } from 'entities/Schedule/model/types';
import { ScheduleBlock } from 'entities/Schedule';
import { ScheduleConst } from 'widgets/ScheduleSection/model/const';
import { isMobile } from 'react-device-detect';

interface SelectShiftProps {
  open: boolean;
  onCancel: (...args: unknown[]) => void;
}

export const SelectShift = ({ open, onCancel }: SelectShiftProps) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      closeIcon={false}
      width={isMobile ? 300 : 1400}
      footer={[]}
    >
      <div className={cls.modal}>
        <h2 className={cls.title}>Выбери смену</h2>
        <div className={cls.blockList}>
          {ScheduleConst.map((block) => (
            <ScheduleBlock key={block.month} block={block} className={cls.itemsList} />
          ))}
        </div>
      </div>
    </Modal>
  )
}