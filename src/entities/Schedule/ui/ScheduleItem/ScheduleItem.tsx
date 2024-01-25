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
  const [modal, setModal] = useState({ open: false, item: { title: '', date: '', tags: '', descriptions: [''], expireTime: '' } })

  const onCancel = () => {
    setModal({ open: false, item: { title: '', date: '', tags: '', descriptions: [''], expireTime: '' } })
  }

  return (
    <div>
      <div className={cls.card} onClick={() => setModal({ open: true, item: { date: date, title: title, tags: tags, descriptions: descriptions, expireTime: expireTime } })}>
        <p className={cls.date}>{date}</p>
        <div className={cls.header}>
          <h3 className={cls.title}>{title}</h3>
          <Button theme={ButtonTheme.CLEAR} >
            <CollapseArrow className={cls.arrow} />
          </Button>
        </div>
        <div className={cls.tagsList}>
          <span className={classNames(cls.tag, {}, [cls.purple])}>{descriptions[0]}</span>
        </div>
      </div>
      <ScheduleModal open={modal.open} onCancel={onCancel} item={modal.item} />
    </div>
  )
}