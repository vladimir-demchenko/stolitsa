import { classNames } from 'shared/lib/classNames'
import HeroImg from 'shared/assets/img/heroImg.png';

import cls from './Hero.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

export const Hero = () => {
  return (
    <div className={classNames('container', {}, [cls.hero])}>
      <h2 className={cls.title}>молодежный палаточный патриотический <span className={cls.highlighted}>слет</span></h2>
      <div className={cls.heroGrid}>
        <div className={cls.imgContainer}>
          <svg className={classNames('curves', {}, [cls.heroCurve])} xmlns="http://www.w3.org/2000/svg" width="724" height="470" viewBox="0 0 724 470" fill="none">
            <path d="M51.3262 462.368C261.441 371.141 199.211 120.937 106.992 75.0369C14.7729 29.1363 -42.403 126.924 69.1476 151.98C180.698 177.037 357.696 167.923 425.429 102.422C493.162 36.9202 302.565 -57.5397 364.989 74.8679C414.928 180.794 619.763 127.296 715.938 87.3061" stroke="#FFDE0D" stroke-linecap="round" />
          </svg>
          <img className={cls.heroImg} src={HeroImg} alt='молодежный палаточный патриотический слет' />
        </div>
        <p className={cls.heroText}>образовательный и командообразующий
          палаточный слет для молодежного актива города Москвы, который ежегодно проводится в нестандартных условиях лесной местности в формате палаточного лагеря</p>
        <Button theme={ButtonTheme.GREEN} className={cls.heroButton}>Подать заявку</Button>
      </div>
    </div>
  )
}