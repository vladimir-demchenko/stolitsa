import { classNames } from 'shared/lib/classNames';
import { ScheduleItem } from '../ScheduleItem/ScheduleItem';
import cls from './ScheduleBlock.module.scss';
import { BlockType } from 'entities/Schedule/model/types';

export const ScheduleBlock = ({ month, items, color }: BlockType) => {
  return (
    <div className={cls.block}>
      <h2 className={classNames(cls.title, {}, [cls[color]])}>{month}</h2>
      <div className={cls.blocksList}>
        {items.map((item) => (
          <ScheduleItem key={item.date} date={item.date} title={item.title} tags={item.tags} />
        ))}
      </div>
    </div>
  )
}
