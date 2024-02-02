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

export const ScheduleItem = ({ item: { id, title, date, descriptions, expire_time, open_reg }, setOpen, selectCancel }: { item: ItemType, setOpen?: any, selectCancel?: (...args: unknown[]) => void; }) => {
  const [modal, setModal] = useState({ open: false, item: { id: '', title: '', date: '', descriptions: [''], expire_time: '', open_reg: true } })

  const onCancel = () => {
    setModal({ open: false, item: { id: '', title: '', date: '', descriptions: [''], expire_time: '', open_reg: true } })
  }

  return (
    <div>
      <div className={cls.card} onClick={() => setModal({ open: true, item: { id: id, date: date, title: title, descriptions: descriptions, expire_time: expire_time, open_reg: open_reg } })}>
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
      <ScheduleModal selectCancel={selectCancel} setOpen={setOpen} open={modal.open} onCancel={onCancel} item={modal.item} />
    </div>
  )
}