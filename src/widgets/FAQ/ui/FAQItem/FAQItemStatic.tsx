import { useState } from 'react';
import ArrowDown from 'shared/assets/icons/arrowDown.svg';
import ArrowUp from 'shared/assets/icons/arrowUp.svg';
import ArrowDownMobile from 'shared/assets/icons/arrowDown_mobile.svg';
import ArrowUpMobile from 'shared/assets/icons/arrowUp_mobile.svg';
import cls from './FAQItem.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useMediaQuery } from 'react-responsive';
import Pdf from 'shared/assets/doc/памятка 2024 .pdf';

const pam = {
  id: 6,
  question: 'Что необходимо взять с собой?',
  answer: 'Ознакомься с памяткой, чтобы ничего не забыть'
};


export const FAQItemStatic = () => {
  const [collapse, setCollapse] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className={cls.faqContainer} onClick={() => setCollapse((prev) => !prev)}>
      <div className={cls.questionContainer}>
        <p className={cls.questionText}>{pam.question}</p>
        <Button theme={ButtonTheme.CLEAR}>
          {collapse ? isMobile ? <ArrowUpMobile /> : <ArrowUp /> : isMobile ? <ArrowDownMobile /> : <ArrowDown />}
        </Button>
      </div>
      {collapse && <div className={cls.answerContainer}>
        <span className={cls.answerText}>Ознакомься с <a href={Pdf} target='_blank' className={cls.link}>памяткой</a>, чтобы ничего не забыть</span>
      </div>}
    </div>
  )
}