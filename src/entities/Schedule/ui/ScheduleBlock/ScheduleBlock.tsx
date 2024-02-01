import { classNames } from 'shared/lib/classNames';
import { ScheduleItem } from '../ScheduleItem/ScheduleItem';
import cls from './ScheduleBlock.module.scss';
import { BlockType } from 'entities/Schedule/model/types';
import { isMobile } from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';

interface ScheduleBlockProps {
  block: BlockType;
  className?: string;
  setOpen?: any;
}

export const ScheduleBlock = ({ block: { month, shifts, color }, className, setOpen }: ScheduleBlockProps) => {
  return (
    <div className={cls.block}>
      <h2 className={classNames(cls.title, {}, [cls[color]])}>{month}</h2>
      <div className={classNames(cls.blocksList, {}, [className])}>
        {shifts.map((shift) => (
          <ScheduleItem key={shift.id} item={shift} setOpen={setOpen} />
        ))}
      </div>
    </div>
  )
}
