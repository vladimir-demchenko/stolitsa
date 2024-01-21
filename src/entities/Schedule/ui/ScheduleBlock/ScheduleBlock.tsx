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
}

export const ScheduleBlock = ({ block: { month, items, color }, className }: ScheduleBlockProps) => {
  return (
    <div className={cls.block}>
      <h2 className={classNames(cls.title, {}, [cls[color]])}>{month}</h2>
      <div className={classNames(cls.blocksList, {}, [className])}>
        {items.map((item) => (
          <ScheduleItem key={item.date} date={item.date} title={item.title} tags={item.tags} descriptions={item.descriptions} expireTime={item.expireTime} />
        ))}
      </div>
    </div>
  )
}
