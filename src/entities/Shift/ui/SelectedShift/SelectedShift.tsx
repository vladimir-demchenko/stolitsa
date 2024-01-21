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
      <span className={cls.first}>{item?.tags}</span>
      <div className={cls.descriptionList}>
        {item?.descriptions?.map((description, index) => (
          <span key={description} className={classNames(cls.description)}>{description}</span>
        ))}
      </div>
    </div>
  )
}