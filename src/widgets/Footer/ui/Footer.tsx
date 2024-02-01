import LogoFooter from 'shared/assets/icons/logo_footer.svg';
import LogoFooterMobile from 'shared/assets/icons/logo_footer_mobile.svg';
import TelegramIcon from 'shared/assets/icons/telegram_icon.svg';
import EmailIcon from 'shared/assets/icons/email_icon.svg';
import cls from './Footer.module.scss';
import { classNames } from 'shared/lib/classNames';
import { Bg } from 'shared/ui/Bg/Bg';
import { useMediaQuery } from 'react-responsive';
import Policy from 'shared/assets/doc/Политика_конфиденциальности.pdf';
import Statement from 'shared/assets/doc/ПОЛОЖЕНИЕ_о_Молодежном_палаточном_патриотическом_слете_STOлицаЛето.pdf';

export const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
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
              <li><a className={cls.footerLink} href={Statement} target='_blank'>Положение о слёте</a></li>
              <li><a className={cls.footerLink} href={Policy} target='_blank'>Политика конфиденциальности</a></li>
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