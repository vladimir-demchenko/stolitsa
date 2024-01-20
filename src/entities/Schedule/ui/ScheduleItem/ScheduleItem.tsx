import CollapseArrow from 'shared/assets/icons/collapseArrow.svg';

import cls from './ScheduleItem.module.scss';
import { classNames } from 'shared/lib/classNames';
import { ItemType } from 'entities/Schedule/model/types';
import { ScheduleModal } from '../ScheduleModal/ScheduleModal';
import { useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';


function getColor(index: number) {
  switch (index) {
    case 0: return 'purple';
    case 1: return 'orange';
    default: return 'green';
  }
}

export const ScheduleItem = ({ title, date, tags, descriptions, expireTime }: ItemType) => {
  const [modal, setModal] = useState({ open: false, item: { title: '', date: '', descriptions: [''], expireTime: '' } })

  const onCancel = () => {
    setModal({ open: false, item: { title: '', date: '', descriptions: [''], expireTime: '' } })
  }

  return (
    <div className={cls.card} >
      <p className={cls.date}>{date}</p>
      <div className={cls.header}>
        <h3 className={cls.title}>{title}</h3>
        <Button theme={ButtonTheme.CLEAR} onClick={() => setModal({ open: true, item: { date: date, title: title, descriptions: descriptions, expireTime: expireTime } })}>
          <CollapseArrow />
        </Button>
      </div>
      <div className={cls.tagsList}>
        {tags.map((tag, index) => (
          <span key={index} className={classNames(cls.tag, {}, [cls[getColor(index)]])}>{tag}</span>
        ))}
      </div>
      <ScheduleModal open={modal.open} onCancel={onCancel} item={modal.item} />
    </div>
  )
}