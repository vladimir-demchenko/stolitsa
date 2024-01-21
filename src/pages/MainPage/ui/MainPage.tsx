import { FC } from 'react';
import cls from './MainPage.module.scss';
import { Promo } from 'widgets/Promo';
import { Hero } from 'widgets/Hero';
import { Carousel } from 'widgets/Carousel';
import { Video } from 'widgets/Video';
import { ScheduleSection } from 'widgets/ScheduleSection';
import { FAQ } from 'widgets/FAQ';
import { Partners } from 'widgets/Partners';
import { Footer } from 'widgets/Footer';

export const MainPage: FC = () => {
  return (
    <>
      <Promo />
      <Hero />
      <Carousel />
      <Video />
      <ScheduleSection />
      <FAQ />
      <Partners />
      <Footer />
    </>
  );
};