import React from 'react';
import { ControlProps } from '../types';

export type UseRadioProps = ControlProps;

export type UseRadioResult = {
  checked: boolean;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
}

export function useRadio({
  name,
  value,
  checked,
  defaultChecked,
  disabled,
  controlRef,
  controlProps,
  onUpdate,
  onChange,
  onFocus,
  onBlur,
  id
}: UseRadioProps): UseRadioResult {
  const [checkedState, setCheckedState] = React.useState(defaultChecked ?? false);
  const isControlled = typeof checked === 'boolean';
  const isChecked = isControlled ? checked : checkedState;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setCheckedState(event.target.checked);
    }

    if (onChange) {
      onChange(event);
    }

    if (onUpdate) {
      onUpdate(event.target.checked);
    }
  };

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> &
    React.RefAttributes<HTMLInputElement> = {
    ...controlProps,
    name: name,
    value,
    id,
    onFocus,
    onBlur,
    disabled,
    type: 'radio',
    onChange: handleChange,
    checked,
    defaultChecked: defaultChecked,
    'aria-checked': isChecked,
  };


  return { checked: isChecked, inputProps };
}