import { ScheduleBlock } from 'entities/Schedule';
import cls from './ScheduleSection.module.scss';
import { classNames } from 'shared/lib/classNames';
import { ScheduleConst } from '../model/const';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

export const ScheduleSection = () => {
  return (
    <div className={classNames('container', {}, [cls.schedule])}>
      <h2 className={cls.title}>Выбирай смену <br />и подавай заявку!</h2>
      <div className={cls.blockList}>
        {ScheduleConst.map((block) => (
          <ScheduleBlock key={block.month} month={block.month} color={block.color} items={block.items} />
        ))}
      </div>
      <svg className={classNames('curves', {}, [cls.greenCurve])} xmlns="http://www.w3.org/2000/svg" width="830" height="721" viewBox="0 0 830 721" fill="none">
        <path d="M937.499 38C806.499 -128.5 44 512.5 12 268.5C-20 24.5001 479.023 173.066 714.244 365.755C841.5 470 444.859 533.57 759.137 647.002C879.937 690.602 883.804 707.835 870.637 711.002" stroke="#ABC704" stroke-width="20" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.cyanCurve])} xmlns="http://www.w3.org/2000/svg" width="515" height="659" viewBox="0 0 515 659" fill="none">
        <path d="M613.5 10.5031C501.659 33.9555 -104 0.00292649 30.2018 324.501C95.1952 481.654 281.932 345.714 333.551 443.295C385.169 540.876 217.232 684.065 198.14 640.931C179.048 597.798 513.156 425.617 551.339 506.934" stroke="#01B2E0" stroke-width="20" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.orangeCurve])} xmlns="http://www.w3.org/2000/svg" width="362" height="905" viewBox="0 0 362 905" fill="none">
        <path d="M-41.5001 894.503C229.5 735.003 57.0838 192.102 216.124 417.06C437.953 730.833 319.405 405.326 321.61 304.337C323.859 201.361 485 -9.49709 -57.9999 11.5031" stroke="#FD7D32" stroke-width="20" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.purpleCurve])} xmlns="http://www.w3.org/2000/svg" width="479" height="864" viewBox="0 0 479 864" fill="none">
        <path d="M557.64 10.6071C501.665 98.4461 -39.5191 301.979 13.7995 182.198C50.4556 99.8487 286.453 117.045 328.074 189.279C375.116 270.92 246.165 481.836 140.352 525.137C34.5396 568.439 52.2338 442.515 154.125 427.371C256.017 412.226 327.426 543.688 207.347 738.756C96.391 919.003 437.486 847.632 535.5 789.003" stroke="#701487" stroke-width="20" stroke-linecap="round" />
      </svg>
    </div>
  )
}