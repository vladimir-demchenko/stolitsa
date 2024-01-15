import { ScheduleBlock } from 'entities/Schedule';
import cls from './ScheduleSection.module.scss';
import { classNames } from 'shared/lib/classNames';
import { ScheduleConst } from '../model/const';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

export const ScheduleSection = () => {
  return (
    <div className={classNames('container', {}, [cls.schedule])}>
      <Button className={cls.scheduleButton} theme={ButtonTheme.PURPLE}>Подавай заявку уже сейчас!</Button>
      <div className={cls.blockList}>
        {ScheduleConst.map((block) => (
          <ScheduleBlock key={block.month} month={block.month} color={block.color} items={block.items} />
        ))}
      </div>
      <svg className={classNames('curves', {}, [cls.blueCurve])} xmlns="http://www.w3.org/2000/svg" width="656" height="842" viewBox="0 0 656 842" fill="none">
        <path d="M648.182 8.02734C576.618 21.5824 434.027 79.1894 436.172 201.176C438.854 353.66 557.459 237.737 562.758 340.699C568.056 443.661 191.311 413.581 169.393 488.753C147.475 563.925 287.711 529.337 288.211 593.835C283.974 634.39 245.3 726.4 124.5 770C3.70025 813.6 -0.166431 830.833 13.0002 834" stroke="#255FA5" stroke-width="15" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.cyanCurve])} xmlns="http://www.w3.org/2000/svg" width="556" height="546" viewBox="0 0 556 546" fill="none">
        <path d="M259.84 7.72932C147.999 31.1817 -55.1057 105.169 27.2015 213.497C130.086 348.908 278.932 234.711 330.55 332.291C382.169 429.872 214.231 573.061 195.139 529.928C176.048 486.794 510.155 314.614 548.339 395.931" stroke="#01B2E0" stroke-width="15" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.orangeCurve])} xmlns="http://www.w3.org/2000/svg" width="701" height="507" viewBox="0 0 701 507" fill="none">
        <path d="M693.414 498.706C542.531 260.991 26.2159 500.24 268.755 369.568C607.049 187.308 269.595 265.627 169.614 251.226C67.6662 236.541 458.978 237.842 7.68522 7.65214" stroke="#FD7D32" stroke-width="15" stroke-linecap="round" />
      </svg>
    </div>
  )
}