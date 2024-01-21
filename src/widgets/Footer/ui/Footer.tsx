import LogoFooter from 'shared/assets/icons/logo_footer.svg';
import LogoFooterMobile from 'shared/assets/icons/logo_footer_mobile.svg';
import TelegramIcon from 'shared/assets/icons/telegram_icon.svg';
import EmailIcon from 'shared/assets/icons/email_icon.svg';
import cls from './Footer.module.scss';
import { isMobile } from 'react-device-detect';
import { classNames } from 'shared/lib/classNames';
import { Bg } from 'shared/ui/Bg/Bg';

export const Footer = () => {
  return (
    <footer className={classNames(cls.footerContainer, {}, [])}>
      <div className={cls.footer}>
        <div className={cls.footerGrid}>
          <div className={cls.logoWrapper}>
            {isMobile ? <LogoFooterMobile /> : <LogoFooter />}
          </div>
          <div className={cls.footerDocuments}>
            <h4 className={cls.footerSubtitle}>Документы</h4>
            <ul className={cls.footerList}>
              <li><a className={cls.footerLink} href="">Положение конкурсного отбора</a></li>
              <li><a className={cls.footerLink} href="">Политика конфиденциальности</a></li>
            </ul>
          </div>
          <div className={cls.footerSocial}>
            <h4 className={cls.footerSubtitle}>Контакты</h4>
            <ul className={cls.footerList}>
              <li className={cls.footerItem}><TelegramIcon className={cls.footerIcon} /> <a className={cls.footerLink} href="https://t.me/STOlitsa_Leto">@STOlitsa_Leto</a></li>
              <li className={cls.footerItem}><EmailIcon className={cls.footerIcon} /> <a className={cls.footerLink} href="mailto:stolitsaleto@anogn.ru">stolitsaleto@anogn.ru</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}