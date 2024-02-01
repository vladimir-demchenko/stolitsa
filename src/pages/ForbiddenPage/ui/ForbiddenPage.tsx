import { classNames } from 'shared/lib/classNames';
import cls from './ForbiddenPage.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/router';

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <section className={classNames('promo-container', {}, ['full-width'])}>
      <div className={classNames(cls.promo, {}, ['full-width', 'promoBg'])}>
        <h1 className={cls.title}>У тебя недостаточно прав для просмотра этой страницы</h1>
        <Button className={cls.promoButton} onClick={() => navigate(RoutePath.main)}>
          Главная страница
        </Button>
      </div>
    </section>
  )
}