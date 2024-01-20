import { classNames } from 'shared/lib/classNames';
import cls from './FAQ.module.scss';
import { FAQItem } from './FAQItem/FAQItem';
import { faqConst } from '../model/const';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

export const FAQ = () => {
  return (
    <div className={classNames('container', {}, [cls.faq])}>
      <h2 className={cls.title}>ТВОИ ВОПРОСЫ</h2>
      <div className={cls.questionList}>
        {faqConst.map((faq) => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <Button onClick={() => window.location.href = "https://t.me/STOlitsa_Leto"} className={cls.questionButton} theme={ButtonTheme.PURPLE}>Напиши нам, если остались вопросы</Button>
      <svg className={classNames('curves', {}, [cls.greenCurve])} xmlns="http://www.w3.org/2000/svg" width="874" height="497" viewBox="0 0 874 497" fill="none">
        <path d="M866 489.399C766.666 458.065 430 -12.0001 559.5 8.49987C648.53 22.5934 693 255 634 313.899C567.316 380.468 330.212 310.5 261 219.5C191.787 128.5 318 113 359 207.5C400 302 291.5 405 71.9997 339.5C27.4997 326.221 -33.5002 342.5 48.4998 422" stroke="#ABC704" stroke-width="15" stroke-linecap="round" />
      </svg>
    </div>
  )
}