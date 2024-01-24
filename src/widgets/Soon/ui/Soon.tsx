import LogoWhite from 'shared/assets/icons/logo_white.svg'
import LogoMos from 'shared/assets/icons/logo_mos_partners.svg';
import PromoBg from 'shared/assets/img/promoBg.png';

import cls from './Soon.module.scss'
import { Button } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames';
import { RegisterModal } from 'features/RegisterModal/ui/RegisterModal';
import { useState } from 'react';

export const Soon = () => {
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    setOpen(false)
  }

  return (
    <div className={classNames('promo-container', {}, ['full-width'])}>
      <div className={classNames(cls.promo, {}, ['full-width', 'promoBg'])}>
        <div className={cls.logoWrapper}>
          <LogoWhite className={cls.logo} />
          <a href="https://mosmolodezh.ru" target="_blank" className={cls.logoLink}><LogoMos style={{ width: '100%', height: '100%' }} /></a>
        </div>
        <h1 className={cls.title}>приём заявок скоро начнется</h1>
        <RegisterModal open={open} onCancel={onCancel} />
      </div>

    </div>
  )
}