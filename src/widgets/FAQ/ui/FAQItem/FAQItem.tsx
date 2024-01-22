import { useState } from 'react';
import ArrowDown from 'shared/assets/icons/arrowDown.svg';
import ArrowUp from 'shared/assets/icons/arrowUp.svg';
import ArrowDownMobile from 'shared/assets/icons/arrowDown_mobile.svg';
import ArrowUpMobile from 'shared/assets/icons/arrowUp_mobile.svg';
import cls from './FAQItem.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useMediaQuery } from 'react-responsive';

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [collapse, setCollapse] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className={cls.faqContainer} onClick={() => setCollapse((prev) => !prev)}>
      <div className={cls.questionContainer}>
        <p className={cls.questionText}>{question}</p>
        <Button theme={ButtonTheme.CLEAR}>
          {collapse ? isMobile ? <ArrowUpMobile /> : <ArrowUp /> : isMobile ? <ArrowDownMobile /> : <ArrowDown />}
        </Button>
      </div>
      {collapse && <div className={cls.answerContainer}>
        <span className={cls.answerText}>{`${answer}`}</span>
      </div>}
    </div>
  )
}