import React from 'react';
import cls from './RadioButton.module.scss';
import { ControlGroupOption, ControlGroupProps } from './types';

import { RadioButtonOption as Option } from './RadioOption';
import { useRadioGroup } from './utils/useRadioButton';
import { classNames } from 'shared/lib/classNames';

export interface DOMProps {
  style?: React.CSSProperties;
  className?: string;
}

export type RadioButtonOption<T extends string = string> = ControlGroupOption<T>;

export interface RadioButtonProps<T extends string = string>
  extends ControlGroupProps<T>,
  DOMProps {
  children?:
  | React.ReactElement<ControlGroupOption<T>>
  | React.ReactElement<ControlGroupOption<T>>[];
}

type RadioButtonComponentType = (<T extends string>(
  props: RadioButtonProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.JSX.Element) & {
  Option: typeof Option;
};

export function RadioButton<T extends string>(props: RadioButtonProps<T>) {
  const { children, style, className } = props;
  let options = props.options;

  if (!options) {
    options = (
      React.Children.toArray(children) as React.ReactElement<ControlGroupOption<T>>[]
    ).map(({ props }) => ({
      value: props.value,
      content: props.content || props.children,
      disabled: props.disabled
    }))
  }

  const plateRef = React.useRef<HTMLDivElement>(null);
  const optionRef = React.useRef<HTMLLabelElement>();

  const handleCheckedOptionsMount: React.Ref<HTMLLabelElement> = React.useCallback(
    (checkedOptionNode: HTMLLabelElement | null) => {
      if (!checkedOptionNode) {
        return;
      }

      const plateNode = plateRef.current;

      if (!plateNode) {
        return;
      }

      const uncheckedOptionsNode = optionRef.current;

      if (uncheckedOptionsNode && uncheckedOptionsNode !== checkedOptionNode) {
        const setPlateStyle = (node: HTMLElement) => {
          plateNode.style.left = `${node.offsetLeft}px`;
          plateNode.style.width = `${node.offsetWidth}px`;
        };

        setPlateStyle(uncheckedOptionsNode);

        plateNode.hidden = false;

        setPlateStyle(checkedOptionNode);
      }

      optionRef.current = checkedOptionNode;
    }, []
  );

  const handlePlateTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = React.useCallback((event) => {
    event.currentTarget.hidden = true;
  }, []);

  const { containerProps, optionsProps } = useRadioGroup({ ...props, options });

  return (
    <div
      {...containerProps}
      style={style}
      className={classNames(cls.group, {}, [className])}
    >
      <div
        ref={plateRef}
        className={cls.plate}
        onTransitionEnd={handlePlateTransitionEnd}
        hidden
      />
      {optionsProps.map((optionProps) => (
        <Option
          {...optionProps}
          key={optionProps.value}
          ref={optionProps.checked ? handleCheckedOptionsMount : undefined}
        />
      ))}
    </div>
  )
}