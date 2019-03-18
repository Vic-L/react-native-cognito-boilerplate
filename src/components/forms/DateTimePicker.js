import React from 'react';
import DatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const DatePickerLayout = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const DatePickerWrapper = styled.View`
  align-items: center;
`;

const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: red;
`;

const ButtonText = styled.Text`
  font-size: 16px;
`;

/*
  date, // The currently selected date.
  onDateChange, // Date change handler
  fadeToColor, // Android picker is fading towords this background color. {color, 'none',}
  maximumDate, // Maximum selectable date.
  minimumDate, // Minimum selectable date
  minuteInterval, // The interval at which minutes can be selected.
  mode, // The date picker mode. {'datetime', 'date', 'time'}
  locale, // The locale for the date picker. Changes language, date order and am/pm preferences. Value needs to be a Locale ID. (https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html)
  textColor, //
  timeZoneOffsetInMinutes, // Timezone offset in minutes (default: device's timezone)
*/

const DateTimePicker = ({
  onDone,
  onCancel,
  ...otherProps
}) => (
  <Wrapper>
    <DatePickerLayout>
      <DatePickerWrapper>
        <ButtonsWrapper>
          <Button
            onPress={onCancel}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>

          <Button
            onPress={onDone}
          >
            <ButtonText>Done</ButtonText>
          </Button>
        </ButtonsWrapper>
        <DatePicker
          {...otherProps}
        />
      </DatePickerWrapper>
    </DatePickerLayout>
  </Wrapper>
);

DateTimePicker.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DateTimePicker;
