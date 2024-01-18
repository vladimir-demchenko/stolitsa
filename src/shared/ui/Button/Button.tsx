import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Mods, classNames } from 'shared/lib/classNames';

import cls from './Button.module.scss';

export enum ButtonTheme {
  ORANGE = 'orange',
  GREEN = 'green',
  PURPLE = 'purple',
  CLEAR = 'clear',
  BORDERED = 'bordered'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  theme?: ButtonTheme;
  disabled?: boolean;
}


export const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.ORANGE,
    disabled,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.disabled]: disabled
  }

  return (
    <button
      type='button'
      className={classNames(cls.button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
}