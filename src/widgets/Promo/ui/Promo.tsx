import LogoWhite from 'shared/assets/icons/logo_white.svg'
import LogoMos from 'shared/assets/icons/logo_mos_partners.svg';
import PromoBg from 'shared/assets/img/promoBg.png';

import cls from './Promo.module.scss'
import { Button } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames';
import { RegisterModal } from 'features/RegisterModal/ui/RegisterModal';
import { useState } from 'react';

export const Promo = () => {
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    setOpen(false)
  }

  return (
    <div className={cls.container}>
      <div className={cls.wrapper}>
        <div className={cls.promo}>
          <div className={cls.logoWrapper}>
            <LogoWhite className={cls.logo} />
            <a href="https://mosmolodezh.ru" target="_blank" className={cls.logoLink}><LogoMos style={{ width: '100%', height: '100%' }} /></a>
          </div>
          <Button className={cls.promoButton} onClick={() => setOpen(true)}>
            Личный кабинет
          </Button>
          <RegisterModal open={open} onCancel={onCancel} />
        </div>
      </div>
      <svg className={classNames('curves', {}, [cls.curved])} xmlns="http://www.w3.org/2000/svg" width="685" height="902" viewBox="0 0 685 902" fill="none">
        <path d="M-101.098 891.377C-50.5512 350.517 383.046 679.355 428.183 565.623C484.605 423.458 54.0582 241.521 397.828 52.5182C689.884 -108.052 753.501 239.279 574.726 359.986C440.855 450.375 -13.7607 297.112 -46.7506 95.2513" stroke="#FD7D32" stroke-width="20" stroke-linecap="round" />
      </svg>
    </div>
  )
}