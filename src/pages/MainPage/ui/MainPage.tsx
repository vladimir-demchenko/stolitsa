import { FC } from 'react';
import cls from './MainPage.module.scss';
import { Promo } from 'widgets/Promo';
import { Hero } from 'widgets/Hero';
import { Carousel } from 'widgets/Carousel';
import { Video } from 'widgets/Video';
import { ScheduleSection } from 'widgets/ScheduleSection';

export const MainPage: FC = () => {
  return (
    <div className={cls.h1}>
      <Promo />
      <Hero />
      <Carousel />
      <Video />
      <ScheduleSection />
    </div>
  );
};