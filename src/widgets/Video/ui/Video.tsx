import { classNames } from 'shared/lib/classNames';
import Placeholder from 'shared/assets/img/placeholder.png';

import cls from './Video.module.scss';

export const Video = () => {
  return (
    <div className={classNames('container', {}, [cls.video])}>
      <h2 className={cls.title}>как это было в <span className={cls.highlighted}>2023</span> году?</h2>
      <div className={cls.placeholder}>
        <img src={Placeholder} alt="placeholder" />
      </div>
      <svg className={classNames('curves', {}, [cls.purpleCurve])} xmlns="http://www.w3.org/2000/svg" width="618" height="413" viewBox="0 0 618 413" fill="none">
        <path d="M609.715 405.198C566.05 306.985 455.304 131.325 361.636 214.385C244.551 318.211 404.315 440.323 427.564 366.578C450.812 292.834 330.227 -17.7525 201.36 9.97722C72.4921 37.707 181.575 247.855 8.41029 232.225" stroke="#701487" stroke-width="15" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.greenCurve])} xmlns="http://www.w3.org/2000/svg" width="514" height="715" viewBox="0 0 514 715" fill="none">
        <path d="M506.264 609.211C384.604 415.126 146.539 514.119 114.964 612.171C83.3902 710.224 188.637 752.112 196.707 638.068C204.778 524.023 169.264 350.385 94.3584 293.224C19.453 236.062 -45.4022 438.655 76.1654 357.109C173.42 291.872 89.8528 97.3562 35.9127 8.25316" stroke="#ABC704" stroke-width="15" stroke-linecap="round" />
      </svg>
    </div>
  )
}