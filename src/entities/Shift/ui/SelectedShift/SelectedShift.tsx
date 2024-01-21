import { ItemType } from 'entities/Schedule/model/types';
import cls from './SelectedShift.module.scss';
import { classNames } from 'shared/lib/classNames';

export const SelectedShift = ({ item }: { item: ItemType }) => {
  return (
    <div className={cls.card}>
      <div className={cls.header}>
        <p className={cls.date}>{item?.date}</p>
        <h3 className={cls.title}>{item?.title}</h3>
      </div>
      <div className={cls.descriptionList}>
        {item?.descriptions?.map((description, index) => (
          <span key={description} className={classNames(cls.description, { [cls.first]: index === 0 })}>{description}</span>
        ))}
      </div>
    </div>
  )
}