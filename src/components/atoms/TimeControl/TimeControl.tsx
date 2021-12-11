import React from 'react';
import './TimeControl.scss';
import { Timepicker } from 'juicyfront';
import { Controller, useFormContext } from 'react-hook-form';
import { ITimepickerProps } from 'juicyfront/components/atoms/Timepicker/Timepicker';


interface IProps extends ITimepickerProps {
  name: string;
}
const TimeControl: React.FC<IProps> = ({ name, ...rest }: IProps) => {

  const { control, formState } = useFormContext();

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <Controller
      control={ control }
      name={ name }
      render={ ({ field: { name, value, onChange } }) => (
        <Timepicker
          { ...rest }

          name={ name }
          defaultValue={ value }
          onChangeValue={ (value, _id) => onChange(value) }

        />
      ) }
    />
  );
};

export default TimeControl;
