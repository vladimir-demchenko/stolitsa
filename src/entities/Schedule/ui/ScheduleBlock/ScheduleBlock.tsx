import { classNames } from 'shared/lib/classNames';
import { ScheduleItem } from '../ScheduleItem/ScheduleItem';
import cls from './ScheduleBlock.module.scss';
import { BlockType } from 'entities/Schedule/model/types';
import { isMobile } from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';

export const ScheduleBlock = ({ month, items, color }: BlockType) => {
  return (
    <div className={cls.block}>
      <h2 className={classNames(cls.title, {}, [cls[color]])}>{month}</h2>
      <div className={cls.blocksList}>
        {items.map((item) => (
          <ScheduleItem key={item.date} date={item.date} title={item.title} tags={item.tags} descriptions={item.descriptions} expireTime={item.expireTime} />
        ))}
      </div>
    </div>
  )
}
