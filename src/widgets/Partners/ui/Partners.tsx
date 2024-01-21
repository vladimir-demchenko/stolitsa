import { classNames } from 'shared/lib/classNames';
import Kosimp from 'shared/assets/icons/kosimp2.svg';
import StolitsaBlack from 'shared/assets/icons/logo_black.svg';
import MosMold from 'shared/assets/icons/ММСР RGB b.svg';
import Koworking from 'shared/assets/icons/koworkingcenter.svg';
import Mosvol from 'shared/assets/icons/mosvol.svg';
import GN_logo from 'shared/assets/icons/GN_logo_color.png';
import cls from './Partners.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import { Bg } from 'shared/ui/Bg/Bg';

export const Partners = () => {
  return (
    <div className={classNames('container', {}, [cls.partners])}>
      <Bg />
      <div className={classNames('content', {}, [cls.content])}>
        <h2 className={cls.title}>при поддержке</h2>
        <div className={cls.partnersList}>
          <div className={cls.slide}>
            <a className={cls.partnersLink} href="https://www.mos.ru/kos/" target='_blank'>
              <Kosimp />
            </a>
          </div>
          <div className={cls.slide}><a className={cls.partnersLink} href="https://vk.com/stolitsa_msk" target='_blank'>
            <StolitsaBlack />
          </a></div>
          <div className={cls.slide}>
            <a className={cls.partnersLink} href="https://mosmolodezh.ru/" target='_blank'>
              <MosMold />
            </a>
          </div>
          <div className={cls.slide}>
            <a className={cls.partnersLink} href="https://dushevnayamoskva.ru/" target='_blank'>
              <Koworking />
            </a>
          </div>
          <div className={cls.slide}>
            <a className={cls.partnersLink} href="https://mosvolonter.ru/" target='_blank'>
              <Mosvol />
            </a>
          </div>
          <div className={cls.slide}><a className={cls.partnersLink} href="https://vk.com/gorodneravnodushnykh" target='_blank'><img className={cls.logoImg} alt="" src={GN_logo} /></a></div>
        </div>
      </div>
      {/* <svg className={classNames('curves', {}, [cls.purpleCurve])} xmlns="http://www.w3.org/2000/svg" width="697" height="917" viewBox="0 0 697 917" fill="none">
        <path d="M689.086 8.02246C544.788 71.0435 275.447 212.107 352.464 272.191C448.736 347.297 636.604 221.755 436.248 197.243C235.893 172.731 -192.555 371.967 115.721 564.155C362.341 717.906 361.286 858.372 329.931 909.386" stroke="#701487" stroke-width="15" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.blueCurve])} xmlns="http://www.w3.org/2000/svg" width="585" height="520" viewBox="0 0 585 520" fill="none">
        <path d="M7.62573 7.70215C80.4583 6.97297 231.573 35.5254 253.37 155.568C280.616 305.622 141.597 215.185 156.575 317.189C171.553 419.194 535.101 315.88 571.323 385.301C607.545 454.721 463.25 448.28 475.397 511.626" stroke="#255FA5" stroke-width="15" stroke-linecap="round" />
      </svg> */}
    </div>
  )
}