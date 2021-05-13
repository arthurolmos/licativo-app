import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

export default function DatePicker({ date, setDate, setShow }) {
  const [mode, setMode] = React.useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(false);
    setDate(currentDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      is24Hour
      display="default"
      onChange={onChange}
    />
  );
}

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  date: Date.now(),
};
