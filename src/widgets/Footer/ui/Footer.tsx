import LogoFooter from 'shared/assets/icons/logo_footer.svg';
import LogoFooterMobile from 'shared/assets/icons/logo_footer_mobile.svg';
import cls from './Footer.module.scss';
import { isMobile } from 'react-device-detect';

export const Footer = () => {
  return (
    <footer className={cls.footer}>
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
            <li className={cls.footerItem}><a className={cls.footerLink} href="">@STOlitsa_Leto</a></li>
            <li className={cls.footerItem}><a className={cls.footerLink} href="mailto:stolitsaleto@anogn.ru">stolitsaleto@anogn.ru</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}