import React from 'react';
import './DateControl.scss';
import { Datepicker } from 'juicyfront';
import { IDateVariants } from 'juicyfront/types/projects.types';
import { Controller, useFormContext } from 'react-hook-form';
import { IDatepickerProps } from 'juicyfront/components/atoms/Datepicker/Datepicker';


interface IProps extends IDatepickerProps {
  name: string;
}

const DateControl: React.FC<IProps> = ({ name, ...rest }: IProps) => {

  const { control, formState } = useFormContext();

  // -------------------------------------------------------------------------------------------------------------------
  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({ field: { name, value, onChange } }) => (
        <Datepicker
          { ...rest }
          name={ name }
          defaultValue={ value }
          onChange={ (event: IDateVariants) => {
            onChange(event.value);
          }}
          invalid={ !!formState.errors[name] }
        />
      ) }
    />
  );
};

export default DateControl;
