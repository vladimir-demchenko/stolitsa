import { classNames } from 'shared/lib/classNames'
import HeroImg from 'shared/assets/img/heroImg.png';

import cls from './Hero.module.scss'
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Bg } from 'shared/ui/Bg/Bg';

export const Hero = () => {
  return (
    <section className={classNames('container', {}, [cls.hero])}>
      <Bg />
      <div className={classNames('content', {}, [cls.content])}>
        <h2 className={cls.title}>молодёжный палаточный патриотический слёт <span className={cls.highlighted}>«STOлица.Лето»</span></h2>
        <div className={cls.heroGrid}>
          <div className={cls.imgContainer}>
            {/* <svg className={classNames('curves', {}, [cls.heroCurve])} xmlns="http://www.w3.org/2000/svg" width="724" height="470" viewBox="0 0 724 470" fill="none">
            <path d="M51.3262 462.368C261.441 371.141 199.211 120.937 106.992 75.0369C14.7729 29.1363 -42.403 126.924 69.1476 151.98C180.698 177.037 357.696 167.923 425.429 102.422C493.162 36.9202 302.565 -57.5397 364.989 74.8679C414.928 180.794 619.763 127.296 715.938 87.3061" stroke="#FFDE0D" stroke-linecap="round" />
          </svg> */}
            <img className={cls.heroImg} src={HeroImg} alt='молодежный палаточный патриотический слет' />
          </div>
          <p className={cls.heroText}>Образовательный и командообразующий
            палаточный слёт для молодёжного актива города Москвы.</p>
          <Button onClick={() => location.href = "#schedule"} theme={ButtonTheme.GREEN} className={cls.heroButton}>Подать заявку</Button>
        </div>
      </div>
      <svg className={classNames('curves', {}, [cls.blueCurve])} xmlns="http://www.w3.org/2000/svg" width="261" height="838" viewBox="0 0 261 838" fill="none">
        <path d="M415.25 11.2358C-184.442 -8.21771 339.752 432.842 82.9601 656.674C-173.832 880.507 331.054 820.582 331.054 820.582" stroke="#01B2E0" stroke-width="20" stroke-linecap="round" />
      </svg>
    </section>
  )
}