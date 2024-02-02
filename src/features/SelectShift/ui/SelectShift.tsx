import { Modal } from 'antd';
import cls from './SelectShift.module.scss';
import { BlockType } from 'entities/Schedule/model/types';
import { ScheduleBlock } from 'entities/Schedule';
import { useMediaQuery } from 'react-responsive';
import { useGetBlocks } from '../api/selectShiftApi';

interface SelectShiftProps {
  open: boolean;
  onCancel: (...args: unknown[]) => void;
}

export const SelectShift = ({ open, onCancel }: SelectShiftProps) => {
  const { data, isLoading } = useGetBlocks(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width={isMobile ? 300 : 1400}
      footer={[]}
    >
      <div className={cls.modal}>
        <h2 className={cls.title}>Выбери смену</h2>
        <div className={cls.blockList}>
          {data?.map((block) => (
            <ScheduleBlock selectCancel={onCancel} key={block.month} block={block} className={cls.itemsList} />
          ))}
        </div>
      </div>
    </Modal>
  )
}