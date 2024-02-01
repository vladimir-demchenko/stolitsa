import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import cls from './Checkbox.module.scss';
import useMergeState from 'rc-util/lib/hooks/useMergedState';
import { classNames } from 'shared/lib/classNames';

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: ChangeEvent<HTMLInputElement>['nativeEvent'];
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (e: CheckboxChangeEvent) => void;
}


export const Checkbox = (props: CheckboxProps) => {
  const {
    className,
    style,
    checked,
    disabled,
    defaultChecked = false,
    type = 'checkbox',
    title,
    onChange,
    children,
    ...inputProps
  } = props;

  const [value, setValue] = useMergeState(defaultChecked, { value: checked })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    if (!('checked' in props)) {
      setValue(e.target.checked);
    }

    onChange?.({
      target: {
        ...props,
        type,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault()
      },
      nativeEvent: e.nativeEvent
    });
  };

  return (
    <label className={cls.checkboxWrapper}>
      <span className={classNames(cls.checkbox, { [cls.checkbox_checked]: value, [cls.disabled]: disabled }, [className])} title={title} style={style}>
        <input
          {...inputProps}
          className={cls.checkbox_input}
          onChange={handleChange}
          disabled={disabled}
          checked={!!value}
          type={type} />
        <span className={cls.checkbox_inner} />
      </span>
      {children !== undefined && <span className={cls.text}>{children}</span>}
    </label>
  )
}