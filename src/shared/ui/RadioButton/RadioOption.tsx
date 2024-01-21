import React from 'react';
import { classNames } from 'shared/lib/classNames';
import cls from './RadioButton.module.scss';
import { useRadio } from './utils/useRadio';

export interface RadioButtonOptionProps<ValueType extends string> {
  value: ValueType;
  content?: React.ReactNode;
  children?: React.ReactNode;
}

export const RadioButtonOption = React.forwardRef<HTMLLabelElement, RadioButtonOptionProps<string>>((props, ref) => {
  const { content, children } = props;
  const { checked, inputProps } = useRadio(props);
  const inner = content || children;

  return (
    <label className={classNames(cls.option, { [cls.option_checked]: checked })} ref={ref}>
      <input
        {...inputProps}
        className={cls.option_control}
      />
      <span className={cls.option_outline} />
      {inner && <span className={cls.option_text}>{inner}</span>}
    </label>
  )
})