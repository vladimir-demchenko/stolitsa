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
    <div className={cls.promo}>
      <div className={cls.logoWrapper}>
        <LogoWhite className={cls.logo} />
        <a href="https://mosmolodezh.ru" target="_blank" className={cls.logoLink}><LogoMos style={{ width: '100%', height: '100%' }} /></a>
      </div>
      <Button className={cls.promoButton} onClick={() => setOpen(true)}>
        Личный кабинет
      </Button>
      <svg className={classNames('curves', {}, [cls.curved])} xmlns="http://www.w3.org/2000/svg" width="492" height="606" viewBox="0 0 492 606" fill="none">
        <path d="M7.65591 460.8C88.0398 542.021 260.392 672.483 306.728 544.567C364.649 384.672 187.96 321.605 241.92 225.299C295.879 128.993 507.279 192.366 481.406 231.807C455.533 271.248 129.618 84.023 177.206 7.82665" stroke="#01B2E0" stroke-linecap="round" />
      </svg>
      <RegisterModal open={open} onCancel={onCancel} />
    </div>
  )
}