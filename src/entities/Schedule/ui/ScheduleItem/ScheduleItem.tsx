import CollapseArrow from 'shared/assets/icons/collapseArrow.svg';

import cls from './ScheduleItem.module.scss';
import { classNames } from 'shared/lib/classNames';
import { ItemType } from 'entities/Schedule/model/types';


function getColor(index: number) {
  switch (index) {
    case 0: return 'purple';
    case 1: return 'orange';
    default: return 'green';
  }
}

export const ScheduleItem = ({ title, date, tags }: ItemType) => {
  return (
    <div className={cls.card}>
      <p className={cls.date}>{date}</p>
      <div className={cls.header}>
        <h3 className={cls.title}>{title}</h3>
        <CollapseArrow />
      </div>
      <div className={cls.tagsList}>
        {tags.map((tag, index) => (
          <span key={index} className={classNames(cls.tag, {}, [cls[getColor(index)]])}>{tag}</span>
        ))}
      </div>
    </div>
  )
}